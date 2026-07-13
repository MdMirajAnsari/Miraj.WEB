import { useEffect, useState } from 'react';
import { integrations } from '../utils/integrations';

interface WeatherState {
  city: string;
  temperature: number;
  windSpeed: number;
  humidity: number;
  code: number;
}

const weatherLabels: Record<number, string> = {
  0: 'Clear',
  1: 'Mainly clear',
  2: 'Partly cloudy',
  3: 'Cloudy',
  45: 'Foggy',
  48: 'Foggy',
  51: 'Light drizzle',
  53: 'Drizzle',
  55: 'Heavy drizzle',
  61: 'Light rain',
  63: 'Rain',
  65: 'Heavy rain',
  80: 'Rain showers',
  95: 'Thunderstorm',
};

const resolveCoordinates = async () => {
  if (integrations.weather.latitude && integrations.weather.longitude) {
    return {
      name: integrations.weather.location,
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

  return match;
};

const WeatherCard = () => {
  const [weather, setWeather] = useState<WeatherState | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    const loadWeather = async () => {
      try {
        const location = await resolveCoordinates();
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m`,
          { signal: controller.signal },
        );

        if (!response.ok) {
          throw new Error('Weather is temporarily unavailable');
        }

        const data = await response.json();
        setWeather({
          city: location.name,
          temperature: Math.round(data.current.temperature_2m),
          windSpeed: Math.round(data.current.wind_speed_10m),
          humidity: data.current.relative_humidity_2m,
          code: data.current.weather_code,
        });
      } catch (fetchError) {
        if (!(fetchError instanceof DOMException && fetchError.name === 'AbortError')) {
          setError(fetchError instanceof Error ? fetchError.message : 'Weather is temporarily unavailable');
        }
      }
    };

    loadWeather();

    return () => controller.abort();
  }, []);

  return (
    <article className="glass-card rounded-lg p-5 sm:p-6">
      <p className="text-sm uppercase tracking-[2px] text-slate-300">Weather</p>
      {weather && (
        <>
          <div className="mt-4 flex items-end justify-between gap-4">
            <div>
              <p className="text-4xl font-black text-white font-poppins">{weather.temperature}°C</p>
              <p className="mt-2 text-slate-300">{weather.city} | {weatherLabels[weather.code] || 'Current conditions'}</p>
            </div>
            <div className="text-right text-sm text-slate-300">
              <p>{weather.humidity}% humidity</p>
              <p>{weather.windSpeed} km/h wind</p>
            </div>
          </div>
        </>
      )}
      {!weather && !error && <p className="mt-4 text-slate-300">Loading weather...</p>}
      {error && <p className="mt-4 text-slate-300">{error}</p>}
    </article>
  );
};

export default WeatherCard;
