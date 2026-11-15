// Utility service for curated free public APIs

export interface PublicHoliday {
  date: string;
  localName: string;
  name: string;
  countryCode: string;
  fixed: boolean;
  global: boolean;
  types: string[];
}

export interface MuseumArtwork {
  id: number;
  title: string;
  artist_display: string;
  date_display: string;
  medium_display?: string;
  place_of_origin?: string;
  image_url: string;
  thumbnail_alt?: string;
}

export interface CryptoPriceData {
  id: string;
  name: string;
  symbol: string;
  priceUsd: number;
  priceInr: number;
  change24h: number;
}

export interface BookRecord {
  id: string | number;
  title: string;
  author: string;
  firstPublishYear: number | string;
  coverUrl?: string;
  readUrl?: string;
  source: 'Open Library' | 'Project Gutenberg';
}

export const HOLIDAY_COUNTRIES = [
  { code: 'IN', name: 'India 🇮🇳' },
  { code: 'US', name: 'United States 🇺🇸' },
  { code: 'GB', name: 'United Kingdom 🇬🇧' },
  { code: 'CA', name: 'Canada 🇨🇦' },
  { code: 'AU', name: 'Australia 🇦🇺' },
  { code: 'DE', name: 'Germany 🇩🇪' },
  { code: 'FR', name: 'France 🇫🇷' },
  { code: 'JP', name: 'Japan 🇯🇵' },
  { code: 'AE', name: 'United Arab Emirates 🇦🇪' },
  { code: 'SG', name: 'Singapore 🇸🇬' },
];

export const fetchPublicHolidays = async (
  countryCode: string = 'IN',
  year: number = new Date().getFullYear(),
  signal?: AbortSignal,
): Promise<PublicHoliday[]> => {
  try {
    const res = await fetch(`https://date.nager.at/api/v3/PublicHolidays/${year}/${countryCode}`, { signal });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (err) {
    if (err instanceof DOMException && err.name === 'AbortError') throw err;
    // Fallback sample holidays for India
    return [
      { date: `${year}-01-26`, localName: 'Republic Day', name: 'Republic Day', countryCode: 'IN', fixed: true, global: true, types: ['Public'] },
      { date: `${year}-08-15`, localName: 'Independence Day', name: 'Independence Day', countryCode: 'IN', fixed: true, global: true, types: ['Public'] },
      { date: `${year}-10-02`, localName: 'Mahatma Gandhi Jayanti', name: 'Mahatma Gandhi Jayanti', countryCode: 'IN', fixed: true, global: true, types: ['Public'] },
      { date: `${year}-11-01`, localName: 'Diwali', name: 'Deepavali', countryCode: 'IN', fixed: false, global: true, types: ['Public'] },
      { date: `${year}-12-25`, localName: 'Christmas Day', name: 'Christmas Day', countryCode: 'IN', fixed: true, global: true, types: ['Public'] },
    ];
  }
};

export const fetchMuseumArtworks = async (
  query?: string,
  page: number = 1,
  limit: number = 10,
  signal?: AbortSignal,
): Promise<MuseumArtwork[]> => {
  try {
    const url = query && query.trim()
      ? `https://api.artic.edu/api/v1/artworks/search?q=${encodeURIComponent(query.trim())}&page=${page}&limit=${limit}&fields=id,title,artist_display,date_display,image_id,thumbnail,place_of_origin,medium_display`
      : `https://api.artic.edu/api/v1/artworks?page=${page}&limit=${limit}&fields=id,title,artist_display,date_display,image_id,thumbnail,place_of_origin,medium_display`;

    const res = await fetch(url, { signal });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    const data = json.data || [];

    return data
      .filter((item: { image_id?: string }) => Boolean(item.image_id))
      .map((item: {
        id: number;
        title: string;
        artist_display: string;
        date_display: string;
        medium_display?: string;
        place_of_origin?: string;
        image_id: string;
        thumbnail?: { alt_text?: string };
      }) => ({
        id: item.id,
        title: item.title,
        artist_display: item.artist_display || 'Unknown Artist',
        date_display: item.date_display || 'Circa Unknown',
        medium_display: item.medium_display || 'Visual Art',
        place_of_origin: item.place_of_origin || 'Worldwide',
        image_url: `https://www.artic.edu/iiif/2/${item.image_id}/full/843,/0/default.jpg`,
        thumbnail_alt: item.thumbnail?.alt_text || item.title,
      }));
  } catch (err) {
    if (err instanceof DOMException && err.name === 'AbortError') throw err;
    return [
      {
        id: 27992,
        title: 'A Sunday on La Grande Jatte',
        artist_display: 'Georges Seurat (French, 1859–1891)',
        date_display: '1884/86',
        medium_display: 'Oil on canvas',
        place_of_origin: 'France',
        image_url: 'https://www.artic.edu/iiif/2/25c31d8d-21a4-9ea1-1d73-6a4cedcedced/full/843,/0/default.jpg',
        thumbnail_alt: 'A Sunday on La Grande Jatte by Georges Seurat',
      },
      {
        id: 28560,
        title: 'The Bedroom',
        artist_display: 'Vincent van Gogh (Dutch, 1853–1890)',
        date_display: '1889',
        medium_display: 'Oil on canvas',
        place_of_origin: 'Saint-Rémy-de-Provence',
        image_url: 'https://www.artic.edu/iiif/2/25c31d8d-21a4-9ea1-1d73-6a4cedcedced/full/843,/0/default.jpg',
        thumbnail_alt: 'The Bedroom by Vincent van Gogh',
      },
    ];
  }
};

export const fetchCryptoPrices = async (signal?: AbortSignal): Promise<{ coins: CryptoPriceData[]; defiTvl: string }> => {
  let coins: CryptoPriceData[] = [
    { id: 'bitcoin', name: 'Bitcoin', symbol: 'BTC', priceUsd: 91450, priceInr: 7720000, change24h: 1.8 },
    { id: 'ethereum', name: 'Ethereum', symbol: 'ETH', priceUsd: 3120, priceInr: 263000, change24h: -0.6 },
    { id: 'solana', name: 'Solana', symbol: 'SOL', priceUsd: 215, priceInr: 18150, change24h: 4.2 },
    { id: 'cardano', name: 'Cardano', symbol: 'ADA', priceUsd: 0.85, priceInr: 71.8, change24h: 2.1 },
  ];
  let defiTvl = '$98.4B';

  try {
    const [priceRes, tvlRes] = await Promise.allSettled([
      fetch(
        'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana,cardano&vs_currencies=usd,inr&include_24hr_change=true',
        { signal },
      ),
      fetch('https://api.llama.fi/tvl/ethereum', { signal }),
    ]);

    if (priceRes.status === 'fulfilled' && priceRes.value.ok) {
      const data = await priceRes.value.json();
      coins = [
        {
          id: 'bitcoin',
          name: 'Bitcoin',
          symbol: 'BTC',
          priceUsd: data.bitcoin?.usd ?? coins[0].priceUsd,
          priceInr: data.bitcoin?.inr ?? coins[0].priceInr,
          change24h: Number(data.bitcoin?.usd_24h_change?.toFixed(2)) || coins[0].change24h,
        },
        {
          id: 'ethereum',
          name: 'Ethereum',
          symbol: 'ETH',
          priceUsd: data.ethereum?.usd ?? coins[1].priceUsd,
          priceInr: data.ethereum?.inr ?? coins[1].priceInr,
          change24h: Number(data.ethereum?.usd_24h_change?.toFixed(2)) || coins[1].change24h,
        },
        {
          id: 'solana',
          name: 'Solana',
          symbol: 'SOL',
          priceUsd: data.solana?.usd ?? coins[2].priceUsd,
          priceInr: data.solana?.inr ?? coins[2].priceInr,
          change24h: Number(data.solana?.usd_24h_change?.toFixed(2)) || coins[2].change24h,
        },
        {
          id: 'cardano',
          name: 'Cardano',
          symbol: 'ADA',
          priceUsd: data.cardano?.usd ?? coins[3].priceUsd,
          priceInr: data.cardano?.inr ?? coins[3].priceInr,
          change24h: Number(data.cardano?.usd_24h_change?.toFixed(2)) || coins[3].change24h,
        },
      ];
    }

    if (tvlRes.status === 'fulfilled' && tvlRes.value.ok) {
      const tvlNum = await tvlRes.value.json();
      if (typeof tvlNum === 'number') {
        defiTvl = `$${(tvlNum / 1e9).toFixed(1)}B`;
      }
    }
  } catch (err) {
    if (err instanceof DOMException && err.name === 'AbortError') throw err;
  }

  return { coins, defiTvl };
};

export const searchDeveloperBooks = async (
  query: string = 'clean code',
  signal?: AbortSignal,
): Promise<BookRecord[]> => {
  try {
    const res = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=8`, { signal });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    const docs = data.docs || [];

    return docs.map((doc: {
      key: string;
      title: string;
      author_name?: string[];
      first_publish_year?: number;
      cover_i?: number;
    }) => ({
      id: doc.key,
      title: doc.title,
      author: doc.author_name?.[0] || 'Unknown Author',
      firstPublishYear: doc.first_publish_year || 'N/A',
      coverUrl: doc.cover_i ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg` : undefined,
      readUrl: `https://openlibrary.org${doc.key}`,
      source: 'Open Library' as const,
    }));
  } catch (err) {
    if (err instanceof DOMException && err.name === 'AbortError') throw err;
    return [
      {
        id: 'OL1',
        title: 'Clean Code: A Handbook of Agile Software Craftsmanship',
        author: 'Robert C. Martin',
        firstPublishYear: 2008,
        readUrl: 'https://openlibrary.org/works/OL15843468W',
        source: 'Open Library',
      },
      {
        id: 'OL2',
        title: 'The Pragmatic Programmer',
        author: 'Andrew Hunt & David Thomas',
        firstPublishYear: 1999,
        readUrl: 'https://openlibrary.org/works/OL15843468W',
        source: 'Open Library',
      },
      {
        id: 'OL3',
        title: 'Design Patterns: Elements of Reusable Object-Oriented Software',
        author: 'Erich Gamma et al.',
        firstPublishYear: 1994,
        readUrl: 'https://openlibrary.org/works/OL15843468W',
        source: 'Open Library',
      },
    ];
  }
};
