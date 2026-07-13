import { useEffect, useMemo, useState } from 'react';
import { integrations } from '../utils/integrations';

interface FooterWeatherState {
  label: string;
  temperature: number;
  humidity: number;
  windSpeed: number;
  code: number;
}

const weatherLabels: Record<number, string> = {
  0: 'Clear',
  1: 'Mainly clear',
  2: 'Partly cloudy',
  3: 'Cloudy',
  45: 'Fog',
  48: 'Fog',
  51: 'Light drizzle',
  53: 'Drizzle',
  55: 'Heavy drizzle',
  61: 'Light rain',
  63: 'Rain',
  65: 'Heavy rain',
  80: 'Rain showers',
  95: 'Thunderstorm',
};

const getPosition = () =>
  new Promise<GeolocationPosition>((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation unavailable'));
      return;
    }

    navigator.geolocation.getCurrentPosition(resolve, reject, {
      enableHighAccuracy: false,
      maximumAge: 1000 * 60 * 20,
      timeout: 6000,
    });
  });
const getReadableLocationName = async (latitude: number, longitude: number) => {
  try {
    const response = await fetch(
      `https://geocoding-api.open-meteo.com/v1/reverse?latitude=${latitude}&longitude=${longitude}&language=en&format=json`,
    );

    if (!response.ok) {
      return 'Current location';
    }

    const data = await response.json();
    const match = data.results?.[0];

    if (!match) {
      return 'Current location';
    }

    return [match.name, match.admin1, match.country].filter(Boolean).join(', ');
  } catch {
    return 'Current location';
  }
};

const geocodeFallbackLocation = async () => {
  if (integrations.weather.latitude && integrations.weather.longitude) {
    return {
      label: integrations.weather.location,
      latitude: Number(integrations.weather.latitude),
      longitude: Number(integrations.weather.longitude),
    };
  }

  const response = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(integrations.weather.location)}&count=1&language=en&format=json`,
  );

  if (!response.ok) {
    throw new Error('Weather location lookup failed');
  }

  const data = await response.json();
  const match = data.results?.[0];

  if (!match) {
    throw new Error('Weather location not found');
  }

  return {
    label: match.name || integrations.weather.location,
    latitude: match.latitude,
    longitude: match.longitude,
  };
};

const formatUpdatedAt = () => {
  const configuredDate = import.meta.env.VITE_APP_UPDATED_AT || '';
  const rawDate = configuredDate || (typeof document !== 'undefined' ? document.lastModified : '');
  const date = rawDate ? new Date(rawDate) : null;

  if (!date || Number.isNaN(date.getTime())) {
    return 'Updated recently';
  }

  return `Updated ${new Intl.DateTimeFormat('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(date)}`;
};

const FooterWeatherStatus = () => {
  const [weather, setWeather] = useState<FooterWeatherState | null>(null);
  const [weatherStatus, setWeatherStatus] = useState('Weather loading');
  const updatedAt = useMemo(formatUpdatedAt, []);
  const appVersion = import.meta.env.VITE_APP_VERSION || '';

  useEffect(() => {
    const controller = new AbortController();

    const loadWeather = async () => {
      try {
        let location;

        try {
          const position = await getPosition();
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          location = {
            label: await getReadableLocationName(latitude, longitude),
            latitude,
            longitude,
          };
        } catch {
          location = await geocodeFallbackLocation();
        }

        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m`,
          { signal: controller.signal },
        );

        if (!response.ok) {
          throw new Error('Weather unavailable');
        }

        const data = await response.json();
        setWeather({
          label: location.label,
          temperature: Math.round(data.current.temperature_2m),
          humidity: data.current.relative_humidity_2m,
          windSpeed: Math.round(data.current.wind_speed_10m),
          code: data.current.weather_code,
        });
      } catch (error) {
        if (!(error instanceof DOMException && error.name === 'AbortError')) {
          setWeatherStatus('Weather unavailable');
        }
      }
    };

    loadWeather();

    return () => controller.abort();
  }, []);

  return (
    <div className="mt-6 flex flex-col gap-3 rounded-lg border border-white/10 bg-white/10 px-4 py-3 text-xs text-slate-200 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
        <span className="font-semibold text-white">Today Weather</span>
        {weather ? (
          <>
            <span>{weather.label}</span>
            <span>{weather.temperature} deg C</span>
            <span>{weatherLabels[weather.code] || 'Current conditions'}</span>
            <span>{weather.humidity}% humidity</span>
            <span>{weather.windSpeed} km/h wind</span>
          </>
        ) : (
          <span>{weatherStatus}</span>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-slate-300">
        <span>{updatedAt}</span>
        {appVersion && <span>Version {appVersion}</span>}
      </div>
    </div>
  );
};

export default FooterWeatherStatus;


