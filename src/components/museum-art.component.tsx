import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchMuseumArtworks, type MuseumArtwork } from '../utils/freeApis';

const MuseumArtSection = () => {
  const [query, setQuery] = useState('');
  const [artworks, setArtworks] = useState<MuseumArtwork[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedArtwork, setSelectedArtwork] = useState<MuseumArtwork | null>(null);

  const loadArtworks = useCallback(async (searchTerm?: string) => {
    setLoading(true);
    const controller = new AbortController();
    try {
      const data = await fetchMuseumArtworks(searchTerm, 1, 12, controller.signal);
      setArtworks(data);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadArtworks();
  }, [loadArtworks]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    loadArtworks(query);
  };

  const QUICK_TOPICS = ['Van Gogh', 'Monet', 'Landscape', 'Impressionism', 'Portrait', 'Japan'];

  return (
    <div className="mt-8">
      {/* Header and Search Bar */}
      <div className="glass-card rounded-[20px] p-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div>
            <h3 className="text-xl font-bold text-white font-poppins">
              World Museum Masterpieces
            </h3>
            <p className="text-sm text-slate-300 mt-1">
              Explore thousands of high-resolution open-access exhibits live from the{' '}
              <a
                href="https://api.artic.edu/docs/"
                target="_blank"
                rel="noreferrer"
                className="text-cyan-400 hover:underline"
              >
                Art Institute of Chicago API
              </a>
              .
            </p>
          </div>
          <span className="text-xs px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 font-mono self-start md:self-auto">
            Live Public API • No Key Required
          </span>
        </div>

        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search artists, art styles, or subjects (e.g. Monet, Portrait, Impressionism)..."
            className="flex-1 px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white text-sm outline-none focus:border-cyan-400 placeholder-slate-400"
          />
          <button
            type="submit"
            disabled={loading}
            className="glass-button-active px-6 py-3 rounded-xl text-sm font-semibold text-white whitespace-nowrap disabled:opacity-50"
          >
            {loading ? 'Searching...' : 'Explore Art'}
          </button>
        </form>

        <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
          <span className="text-slate-400">Popular:</span>
          {QUICK_TOPICS.map((topic) => (
            <button
              key={topic}
              type="button"
              onClick={() => {
                setQuery(topic);
                loadArtworks(topic);
              }}
              className="px-2.5 py-1 rounded-md bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white transition"
            >
              {topic}
            </button>
          ))}
        </div>
      </div>

      {/* Artworks Grid */}
      {loading ? (
        <div className="text-center py-20 text-slate-400">
          <div className="inline-block w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin mb-3" />
          <p>Curating exhibits from the Art Institute collection...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {artworks.map((art, idx) => (
            <motion.article
              key={art.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.04 }}
              className="glass-card rounded-2xl overflow-hidden group cursor-pointer flex flex-col justify-between hover:border-cyan-400/40 transition duration-300"
              onClick={() => setSelectedArtwork(art)}
            >
              <div className="relative aspect-[4/3] bg-black/40 overflow-hidden">
                <img
                  src={art.image_url}
                  alt={art.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <span className="text-xs text-cyan-300 font-semibold">Click to inspect artwork 🔍</span>
                </div>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-white text-base line-clamp-1 group-hover:text-cyan-300 transition-colors">
                    {art.title}
                  </h4>
                  <p className="text-xs text-slate-300 mt-1 line-clamp-2">
                    {art.artist_display}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
                  <span>{art.date_display}</span>
                  <span className="truncate max-w-[120px]">{art.place_of_origin}</span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      )}

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedArtwork && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl p-4 sm:p-6 overflow-y-auto flex items-center justify-center"
            onClick={() => setSelectedArtwork(null)}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="glass-card rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col md:flex-row border border-white/20"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="md:w-3/5 bg-black flex items-center justify-center p-2">
                <img
                  src={selectedArtwork.image_url}
                  alt={selectedArtwork.title}
                  className="max-h-[60vh] md:max-h-[85vh] w-auto object-contain rounded-lg"
                />
              </div>

              <div className="md:w-2/5 p-6 flex flex-col justify-between overflow-y-auto">
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <span className="text-xs px-2.5 py-1 rounded bg-white/10 text-cyan-300 font-mono">
                      {selectedArtwork.place_of_origin}
                    </span>
                    <button
                      type="button"
                      onClick={() => setSelectedArtwork(null)}
                      className="text-slate-400 hover:text-white text-lg p-1"
                    >
                      ✕
                    </button>
                  </div>

                  <h3 className="text-2xl font-bold text-white font-poppins leading-tight">
                    {selectedArtwork.title}
                  </h3>

                  <div className="space-y-2 text-sm text-slate-300">
                    <div>
                      <span className="block text-xs uppercase tracking-wider text-slate-400">Artist</span>
                      <strong className="text-white">{selectedArtwork.artist_display}</strong>
                    </div>

                    <div>
                      <span className="block text-xs uppercase tracking-wider text-slate-400">Date</span>
                      <p>{selectedArtwork.date_display}</p>
                    </div>

                    {selectedArtwork.medium_display && (
                      <div>
                        <span className="block text-xs uppercase tracking-wider text-slate-400">Medium</span>
                        <p className="text-xs text-slate-300">{selectedArtwork.medium_display}</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-white/10 flex flex-col gap-2">
                  <a
                    href={`https://www.artic.edu/artworks/${selectedArtwork.id}`}
                    target="_blank"
                    rel="noreferrer"
                    className="glass-button-active text-center py-2.5 rounded-xl text-sm font-semibold text-white"
                  >
                    View on Art Institute of Chicago ↗
                  </a>
                  <button
                    type="button"
                    onClick={() => setSelectedArtwork(null)}
                    className="glass-button py-2 rounded-xl text-sm text-slate-300 hover:text-white"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MuseumArtSection;
