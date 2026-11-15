import { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { searchDeveloperBooks, type BookRecord } from '../utils/freeApis';

const BooksSection = () => {
  const [searchTerm, setSearchTerm] = useState('react javascript web development');
  const [books, setBooks] = useState<BookRecord[]>([]);
  const [loading, setLoading] = useState(false);

  const loadBooks = useCallback(async (query: string) => {
    setLoading(true);
    const controller = new AbortController();
    try {
      const data = await searchDeveloperBooks(query, controller.signal);
      setBooks(data);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadBooks('react javascript web development');
  }, [loadBooks]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      loadBooks(searchTerm);
    }
  };

  const SUGGESTIONS = ['React', 'TypeScript', 'Clean Code', 'Algorithms', 'System Design', 'Python'];

  return (
    <div className="w-full bg-slate-900 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-sm uppercase tracking-[3px] text-purple-400 font-semibold">
            Recommended Reading
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-poppins mt-2">
            Developer Library & Literature
          </h2>
          <p className="mt-2 text-slate-300 text-sm max-w-2xl mx-auto">
            Search millions of software development books, computer science references, and classic guides live via the{' '}
            <a
              href="https://openlibrary.org/developers/api"
              target="_blank"
              rel="noreferrer"
              className="text-cyan-400 underline"
            >
              Open Library API
            </a>{' '}
            & Project Gutenberg.
          </p>
        </div>

        {/* Search controls */}
        <div className="glass-card rounded-2xl p-5 mb-8 max-w-3xl mx-auto">
          <form onSubmit={handleSearch} className="flex gap-2">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search books, authors, or topics (e.g. Clean Code, Algorithms, React)..."
              className="flex-1 px-4 py-2.5 rounded-lg bg-black/40 border border-white/10 text-white text-sm outline-none focus:border-purple-400"
            />
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold text-sm hover:brightness-110 disabled:opacity-50 transition"
            >
              {loading ? 'Searching...' : 'Find Books'}
            </button>
          </form>

          <div className="mt-3 flex flex-wrap items-center gap-1.5 text-xs text-slate-400">
            <span>Popular topics:</span>
            {SUGGESTIONS.map((topic) => (
              <button
                key={topic}
                type="button"
                onClick={() => {
                  setSearchTerm(topic);
                  loadBooks(topic);
                }}
                className="px-2.5 py-0.5 rounded bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition"
              >
                {topic}
              </button>
            ))}
          </div>
        </div>

        {/* Books Grid */}
        {loading ? (
          <div className="text-center py-12 text-slate-400">
            <div className="inline-block w-8 h-8 border-2 border-purple-400 border-t-transparent rounded-full animate-spin mb-3" />
            <p>Searching Open Library catalogue...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {books.map((book) => (
              <motion.article
                key={book.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card rounded-xl p-4 flex flex-col justify-between hover:border-purple-500/40 transition duration-300"
              >
                <div>
                  <div className="aspect-[3/4] bg-black/40 rounded-lg overflow-hidden mb-3 flex items-center justify-center">
                    {book.coverUrl ? (
                      <img
                        src={book.coverUrl}
                        alt={book.title}
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-center p-4 text-slate-500">
                        <span className="text-3xl block mb-2">📖</span>
                        <span className="text-xs">No Cover Image</span>
                      </div>
                    )}
                  </div>

                  <h4 className="font-bold text-white text-sm line-clamp-2" title={book.title}>
                    {book.title}
                  </h4>
                  <p className="text-xs text-purple-300 mt-1 line-clamp-1">{book.author}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
                  <span>Published: {book.firstPublishYear}</span>
                  {book.readUrl && (
                    <a
                      href={book.readUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-cyan-300 hover:underline"
                    >
                      Open Library ↗
                    </a>
                  )}
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BooksSection;
