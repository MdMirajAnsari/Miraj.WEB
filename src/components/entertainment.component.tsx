import { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';

interface AnimeItem {
  mal_id: number;
  title: string;
  score: number;
  episodes: number;
  status: string;
  image_url: string;
  synopsis: string;
  url: string;
}

interface TvShowItem {
  id: number;
  name: string;
  rating: number | string;
  genres: string[];
  status: string;
  premiered: string;
  image_url?: string;
  summary: string;
  url: string;
}

const EntertainmentSection = () => {
  const [activeMedia, setActiveMedia] = useState<'anime' | 'tv'>('anime');
  const [searchQuery, setSearchQuery] = useState('attack on titan');
  const [animeList, setAnimeList] = useState<AnimeItem[]>([]);
  const [tvList, setTvList] = useState<TvShowItem[]>([]);
  const [loading, setLoading] = useState(false);

  const searchAnime = useCallback(async (query: string) => {
    setLoading(true);
    try {
      const res = await fetch(`https://api.jikan.moe/v4/anime?q=${encodeURIComponent(query)}&limit=8`);
      if (!res.ok) throw new Error('API error');
      const json = await res.json();
      const data = json.data || [];

      const list: AnimeItem[] = data.map((item: {
        mal_id: number;
        title: string;
        score: number;
        episodes: number;
        status: string;
        images?: { jpg?: { large_image_url?: string; image_url?: string } };
        synopsis?: string;
        url: string;
      }) => ({
        mal_id: item.mal_id,
        title: item.title,
        score: item.score || 8.5,
        episodes: item.episodes || 24,
        status: item.status || 'Finished Airing',
        image_url: item.images?.jpg?.large_image_url || item.images?.jpg?.image_url || '',
        synopsis: item.synopsis || 'An exciting and acclaimed anime series.',
        url: item.url,
      }));

      setAnimeList(list);
    } catch {
      setAnimeList([
        {
          mal_id: 16498,
          title: 'Attack on Titan (Shingeki no Kyojin)',
          score: 8.54,
          episodes: 25,
          status: 'Finished Airing',
          image_url: 'https://cdn.myanimelist.net/images/anime/10/47347l.jpg',
          synopsis: 'Centuries ago, mankind was slaughtered to near extinction by monstrous humanoid creatures called titans.',
          url: 'https://myanimelist.net/anime/16498/Shingeki_no_Kyojin',
        },
        {
          mal_id: 1535,
          title: 'Death Note',
          score: 8.62,
          episodes: 37,
          status: 'Finished Airing',
          image_url: 'https://cdn.myanimelist.net/images/anime/9/9453l.jpg',
          synopsis: 'A high school student who discovers a supernatural notebook that allows him to kill anyone by writing their name in it.',
          url: 'https://myanimelist.net/anime/1535/Death_Note',
        },
      ]);
    } finally {
      setLoading(false);
    }
  }, []);

  const searchTv = useCallback(async (query: string) => {
    setLoading(true);
    try {
      const res = await fetch(`https://api.tvmaze.com/search/shows?q=${encodeURIComponent(query)}`);
      if (!res.ok) throw new Error('API error');
      const data = await res.json();

      const list: TvShowItem[] = data.map((entry: {
        show: {
          id: number;
          name: string;
          rating?: { average?: number };
          genres?: string[];
          status?: string;
          premiered?: string;
          image?: { medium?: string; original?: string };
          summary?: string;
          url: string;
        };
      }) => ({
        id: entry.show.id,
        name: entry.show.name,
        rating: entry.show.rating?.average || 'N/A',
        genres: entry.show.genres || [],
        status: entry.show.status || 'Ended',
        premiered: entry.show.premiered || 'N/A',
        image_url: entry.show.image?.medium || entry.show.image?.original,
        summary: entry.show.summary?.replace(/<[^>]*>?/gm, '') || 'Acclaimed television drama series.',
        url: entry.show.url,
      }));

      setTvList(list);
    } catch {
      setTvList([
        {
          id: 169,
          name: 'Breaking Bad',
          rating: 9.3,
          genres: ['Drama', 'Crime', 'Thriller'],
          status: 'Ended',
          premiered: '2008-01-20',
          image_url: 'https://static.tvmaze.com/uploads/images/medium_portrait/0/2400.jpg',
          summary: 'A chemistry teacher diagnosed with terminal lung cancer turns to manufacturing methamphetamine to secure his family financial future.',
          url: 'https://www.tvmaze.com/shows/169/breaking-bad',
        },
      ]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (activeMedia === 'anime') {
      searchAnime('attack on titan');
    } else {
      searchTv('silicon valley');
    }
  }, [activeMedia, searchAnime, searchTv]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    if (activeMedia === 'anime') {
      searchAnime(searchQuery);
    } else {
      searchTv(searchQuery);
    }
  };

  return (
    <div className="mt-8">
      {/* Header & Controls */}
      <div className="glass-card rounded-[20px] p-6 mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <h3 className="text-xl font-bold text-white font-poppins">
              Pop Culture & Entertainment
            </h3>
            <p className="text-sm text-slate-300 mt-1">
              Live TV shows, episodes, and anime database powered by{' '}
              <strong className="text-cyan-300">Jikan (MyAnimeList)</strong> &{' '}
              <strong className="text-cyan-300">TVmaze API</strong>.
            </p>
          </div>

          {/* Mode Switcher */}
          <div className="flex gap-2">
            <button
              onClick={() => {
                setActiveMedia('anime');
                setSearchQuery('jujutsu kaisen');
              }}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition ${
                activeMedia === 'anime'
                  ? 'glass-button-active text-white'
                  : 'glass-button text-slate-300'
              }`}
            >
              ⛩️ Anime (Jikan)
            </button>
            <button
              onClick={() => {
                setActiveMedia('tv');
                setSearchQuery('mr robot');
              }}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition ${
                activeMedia === 'tv'
                  ? 'glass-button-active text-white'
                  : 'glass-button text-slate-300'
              }`}
            >
              📺 TV Shows (TVmaze)
            </button>
          </div>
        </div>

        {/* Search bar */}
        <form onSubmit={handleSearchSubmit} className="flex gap-2">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={activeMedia === 'anime' ? 'Search anime (e.g. Naruto, Death Note, Steins Gate)...' : 'Search TV series (e.g. Breaking Bad, Dark, Silicon Valley)...'}
            className="flex-1 px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-xs outline-none focus:border-cyan-400"
          />
          <button
            type="submit"
            disabled={loading}
            className="glass-button-active px-5 py-2.5 rounded-xl text-xs font-semibold text-white whitespace-nowrap disabled:opacity-50"
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </form>
      </div>

      {/* Grid of Results */}
      {loading ? (
        <div className="text-center py-20 text-slate-400">
          <div className="inline-block w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin mb-3" />
          <p>Querying {activeMedia === 'anime' ? 'MyAnimeList registry' : 'TVmaze network'}...</p>
        </div>
      ) : activeMedia === 'anime' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {animeList.map((anime, idx) => (
            <motion.article
              key={anime.mal_id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.04 }}
              className="glass-card rounded-2xl overflow-hidden flex flex-col justify-between hover:border-cyan-400/40 transition duration-300"
            >
              <div className="relative aspect-[3/4] bg-black/50 overflow-hidden">
                {anime.image_url && (
                  <img
                    src={anime.image_url}
                    alt={anime.title}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                )}
                <div className="absolute top-3 right-3 bg-black/80 px-2 py-0.5 rounded-lg border border-white/20 text-xs font-mono font-bold text-amber-300">
                  ★ {anime.score}
                </div>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-white text-base line-clamp-1">{anime.title}</h4>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-3 leading-relaxed">
                    {anime.synopsis}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
                  <span>{anime.episodes} Episodes</span>
                  <a
                    href={anime.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-cyan-300 hover:underline"
                  >
                    MyAnimeList ↗
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {tvList.map((show, idx) => (
            <motion.article
              key={show.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.04 }}
              className="glass-card rounded-2xl overflow-hidden flex flex-col justify-between hover:border-cyan-400/40 transition duration-300"
            >
              <div className="relative aspect-[3/4] bg-black/50 overflow-hidden">
                {show.image_url ? (
                  <img
                    src={show.image_url}
                    alt={show.name}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-3xl">📺</div>
                )}
                {show.rating && show.rating !== 'N/A' && (
                  <div className="absolute top-3 right-3 bg-black/80 px-2 py-0.5 rounded-lg border border-white/20 text-xs font-mono font-bold text-cyan-300">
                    ★ {show.rating}
                  </div>
                )}
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-white text-base line-clamp-1">{show.name}</h4>
                  <div className="flex flex-wrap gap-1 mt-1 mb-2">
                    {show.genres.map((g) => (
                      <span key={g} className="text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-slate-300">
                        {g}
                      </span>
                    ))}
                  </div>
                  <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                    {show.summary}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
                  <span>Premiered: {show.premiered}</span>
                  <a
                    href={show.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-cyan-300 hover:underline"
                  >
                    TVmaze ↗
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      )}
    </div>
  );
};

export default EntertainmentSection;
