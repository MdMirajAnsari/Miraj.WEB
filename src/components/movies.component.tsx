import { useEffect, useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { styles } from '../styles';
import { textVariant } from '../utils/motion';
import type { RepoMovie } from '../models';

const SAMPLE_FALLBACK_MOVIES: RepoMovie[] = [
  {
    id: 'demo-1',
    filename: 'Big-Buck-Bunny.mp4',
    title: 'Big Buck Bunny (Sample HD)',
    extension: 'mp4',
    sizeFormatted: '15.8 MB',
    modified: '2026-11-15T00:00:00.000Z',
    streamUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  },
  {
    id: 'demo-2',
    filename: 'Elephants-Dream.mp4',
    title: 'Elephants Dream (Open Movie)',
    extension: 'mp4',
    sizeFormatted: '22.4 MB',
    modified: '2026-11-15T00:00:00.000Z',
    streamUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
  },
  {
    id: 'demo-3',
    filename: 'For-Bigger-Blazes.mp4',
    title: 'Chromecast Nature Cinematic',
    extension: 'mp4',
    sizeFormatted: '12.1 MB',
    modified: '2026-11-15T00:00:00.000Z',
    streamUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
  },
];

const STORAGE_ENDPOINT_KEY = 'miraj-movies-server-endpoint';

const Movies = () => {
  const [movies, setMovies] = useState<RepoMovie[]>([]);
  const [activeMovie, setActiveMovie] = useState<RepoMovie | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFormat, setSelectedFormat] = useState('all');
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [isServerActive, setIsServerActive] = useState(false);
  const [serverDirectory, setServerDirectory] = useState('C:\\Users\\Miraj\\source\\repos\\repo-play');
  const [serverIp, setServerIp] = useState('192.168.1.8');
  const [showNetworkModal, setShowNetworkModal] = useState(false);

  // Custom LAN server endpoint (e.g. for hosted app communicating to home computer)
  const [customEndpoint, setCustomEndpoint] = useState(() => {
    if (typeof window !== 'undefined') {
      return (
        window.localStorage.getItem(STORAGE_ENDPOINT_KEY) ||
        (window.location.hostname === 'localhost' ? '' : 'http://192.168.1.8:4201')
      );
    }
    return '';
  });

  const videoRef = useRef<HTMLVideoElement>(null);
  const folderInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch movies from server (either local Vite dev server or standalone LAN media server on port 4201)
  const fetchMoviesFromEndpoint = useCallback(async (baseUrl: string = customEndpoint) => {
    setLoading(true);

    const endpointsToTry: string[] = [];
    if (baseUrl.trim()) {
      endpointsToTry.push(baseUrl.trim().replace(/\/$/, ''));
    }
    endpointsToTry.push(''); // relative URL: /api/movies
    endpointsToTry.push('http://localhost:4201');
    endpointsToTry.push('http://192.168.1.8:4201');

    let success = false;

    for (const host of endpointsToTry) {
      try {
        const url = `${host}/api/movies`;
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 2000);

        const res = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);

        if (res.ok) {
          const data = await res.json();
          setIsServerActive(true);
          if (data.directory) setServerDirectory(data.directory);
          if (data.serverIp) setServerIp(data.serverIp);

          const list: RepoMovie[] = (data.movies || []).map((m: RepoMovie) => ({
            ...m,
            // Prepend host URL if streaming from remote LAN server
            streamUrl: host ? `${host}${m.streamUrl}` : m.streamUrl,
          }));

          if (list.length > 0) {
            setMovies(list);
            setActiveMovie((prev) => prev || list[0]);
          } else {
            setMovies(SAMPLE_FALLBACK_MOVIES);
            setActiveMovie((prev) => prev || SAMPLE_FALLBACK_MOVIES[0]);
          }

          success = true;
          break;
        }
      } catch {
        // try next endpoint
      }
    }

    if (!success) {
      setIsServerActive(false);
      setMovies((prev) => (prev.length > 0 ? prev : SAMPLE_FALLBACK_MOVIES));
      setActiveMovie((prev) => prev || SAMPLE_FALLBACK_MOVIES[0]);
    }

    setLoading(false);
  }, [customEndpoint]);

  useEffect(() => {
    fetchMoviesFromEndpoint();
  }, [fetchMoviesFromEndpoint]);

  const handleSaveEndpoint = () => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_ENDPOINT_KEY, customEndpoint.trim());
    }
    fetchMoviesFromEndpoint(customEndpoint);
    setShowNetworkModal(false);
  };

  // Handle local folder selection in browser (Direct local playback without server)
  const handleSelectLocalFolder = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const videoExts = ['.mp4', '.webm', '.mkv', '.mov', '.m4v', '.ogv', '.avi'];
    const loadedList: RepoMovie[] = [];

    Array.from(files).forEach((file, idx) => {
      const name = file.name;
      const ext = name.substring(name.lastIndexOf('.')).toLowerCase();

      if (videoExts.includes(ext)) {
        const streamUrl = URL.createObjectURL(file);
        const sizeMb = (file.size / (1024 * 1024)).toFixed(1);
        const cleanTitle = name.replace(/\.[^/.]+$/, '').replace(/[-_.]+/g, ' ').trim();

        loadedList.push({
          id: `browser-file-${idx}-${file.name}`,
          filename: file.name,
          title: cleanTitle,
          extension: ext.replace('.', ''),
          size: file.size,
          sizeFormatted: `${sizeMb} MB`,
          modified: new Date(file.lastModified).toISOString(),
          streamUrl,
          isLocalFile: true,
        });
      }
    });

    if (loadedList.length > 0) {
      setMovies(loadedList);
      setActiveMovie(loadedList[0]);
      setIsServerActive(true);
      setServerDirectory('Local Folder (Selected directly in Browser)');
    }
  };

  const handleSpeedChange = (speed: number) => {
    setPlaybackSpeed(speed);
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
    }
  };

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;

      if (e.code === 'Space') {
        e.preventDefault();
        if (videoRef.current) {
          if (videoRef.current.paused) videoRef.current.play();
          else videoRef.current.pause();
        }
      } else if (e.key === 'f' || e.key === 'F') {
        e.preventDefault();
        if (videoRef.current) {
          if (!document.fullscreenElement) {
            videoRef.current.requestFullscreen?.();
          } else {
            document.exitFullscreen?.();
          }
        }
      } else if (e.key === 'm' || e.key === 'M') {
        if (videoRef.current) {
          videoRef.current.muted = !videoRef.current.muted;
        }
      } else if (e.key === 'ArrowRight') {
        if (videoRef.current) videoRef.current.currentTime += 10;
      } else if (e.key === 'ArrowLeft') {
        if (videoRef.current) videoRef.current.currentTime -= 10;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const filteredMovies = movies.filter((m) => {
    const matchesSearch =
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.filename.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFormat = selectedFormat === 'all' || m.extension.toLowerCase() === selectedFormat;
    return matchesSearch && matchesFormat;
  });

  const availableExtensions = ['all', ...Array.from(new Set(movies.map((m) => m.extension.toLowerCase())))];

  return (
    <div className="relative z-0 min-h-screen pt-[120px] pb-20">
      <div className={`${styles.padding} max-w-7xl mx-auto`}>
        {/* Header */}
        <motion.div
          variants={textVariant()}
          initial="hidden"
          animate="show"
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-6"
        >
          <div>
            <p className={`${styles.sectionSubText}`}>Personal Media & Video Streamer</p>
            <h2 className={`${styles.sectionHeadTextLight}`}>Repo Play.</h2>
            <p className="mt-2 text-taupe text-[16px] max-w-2xl">
              Stream movies directly from{' '}
              <code className="text-cyan-300 font-mono bg-white/10 px-2 py-0.5 rounded text-xs">
                C:\Users\Miraj\source\repos\repo-play
              </code>{' '}
              on your home Wi-Fi network, on mobile devices, or when hosted.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => fetchMoviesFromEndpoint()}
              disabled={loading}
              className="glass-button px-4 py-2.5 rounded-xl text-xs font-semibold text-white flex items-center gap-2 hover:bg-white/10 transition"
              title="Rescan directory"
            >
              <span>🔄</span>
              <span>{loading ? 'Scanning...' : 'Refresh Library'}</span>
            </button>

            {/* Same Network Settings Pill */}
            <button
              onClick={() => setShowNetworkModal(true)}
              className="glass-button px-4 py-2.5 rounded-xl text-xs font-semibold text-cyan-300 border border-cyan-500/30 flex items-center gap-2 hover:bg-white/10 transition"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Same Network / Host Setup</span>
            </button>

            {/* Browser Folder Picker */}
            <button
              onClick={() => folderInputRef.current?.click()}
              className="glass-button-active px-4 py-2.5 rounded-xl text-xs font-semibold text-white flex items-center gap-2"
              title="Select folder directly without server"
            >
              <span>📁</span>
              <span>Select Folder</span>
            </button>
            <input
              ref={folderInputRef}
              type="file"
              // @ts-expect-error webkitdirectory is supported in modern browsers
              webkitdirectory=""
              directory=""
              multiple
              className="hidden"
              onChange={handleSelectLocalFolder}
            />

            <button
              onClick={() => fileInputRef.current?.click()}
              className="glass-button px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-white flex items-center gap-2"
            >
              <span>➕</span>
              <span>Add Videos</span>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="video/*"
              multiple
              className="hidden"
              onChange={handleSelectLocalFolder}
            />
          </div>
        </motion.div>

        {/* Directory Connection Banner */}
        <div className="mt-6 p-4 rounded-2xl bg-black/40 border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5">
            <span
              className={`w-2.5 h-2.5 rounded-full ${
                isServerActive ? 'bg-emerald-400 animate-pulse' : 'bg-cyan-400'
              }`}
            />
            <span className="text-slate-300">
              Active Storage:{' '}
              <strong className="text-white font-mono">{serverDirectory}</strong>
            </span>
          </div>

          <div className="flex items-center gap-3 text-slate-400">
            <span>{movies.length} videos available</span>
            <span className="text-white/20">•</span>
            <span className="text-cyan-300 font-mono">
              LAN IP: {serverIp}
            </span>
          </div>
        </div>

        {/* Network & Host Configuration Modal */}
        <AnimatePresence>
          {showNetworkModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl p-4 sm:p-6 flex items-center justify-center"
              onClick={() => setShowNetworkModal(false)}
            >
              <motion.div
                initial={{ scale: 0.95, y: 15 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 15 }}
                className="glass-card rounded-3xl max-w-xl w-full p-6 sm:p-8 border border-white/20 shadow-2xl space-y-5"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl">📡</span>
                    <h3 className="text-lg font-bold text-white font-poppins">
                      Same Network & Hosted Setup
                    </h3>
                  </div>
                  <button
                    onClick={() => setShowNetworkModal(false)}
                    className="w-8 h-8 rounded-full glass-button flex items-center justify-center text-slate-400 hover:text-white"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-4 text-xs text-slate-300">
                  <div className="p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-200 space-y-1.5">
                    <p className="font-bold text-sm">📱 Access from any phone/tablet/TV on Wi-Fi:</p>
                    <p>Open your phone's browser and go to:</p>
                    <code className="block p-2 rounded bg-black/50 font-mono text-white text-xs select-all">
                      http://{serverIp}:4200/movies
                    </code>
                  </div>

                  <div className="space-y-2">
                    <label className="font-semibold text-white block uppercase tracking-wider text-[11px]">
                      LAN Media Server Endpoint (When app is hosted online):
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={customEndpoint}
                        onChange={(e) => setCustomEndpoint(e.target.value)}
                        placeholder={`http://${serverIp}:4201`}
                        className="flex-1 px-3 py-2 rounded-xl bg-black/50 border border-white/15 text-white font-mono text-xs outline-none focus:border-cyan-400"
                      />
                      <button
                        onClick={handleSaveEndpoint}
                        className="glass-button-active px-4 py-2 rounded-xl font-semibold text-white"
                      >
                        Apply
                      </button>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      Start the standalone LAN server on your PC anytime by running:{' '}
                      <code className="text-cyan-300 font-mono">npm run media:server</code>.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1">
                    <strong className="text-white">🚀 Zero-Setup Hosted Mode:</strong>
                    <p className="text-slate-400">
                      Even if you deploy to Vercel/Netlify, you can always click the <strong>&ldquo;Select Folder&rdquo;</strong> button and pick your <code className="text-white">repo-play</code> folder directly in the browser without needing any backend server!
                    </p>
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    onClick={() => setShowNetworkModal(false)}
                    className="glass-button px-5 py-2 rounded-xl text-xs text-white"
                  >
                    Done
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Cinema Workspace */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-[1.8fr_1.2fr] gap-8 items-start">
          {/* Cinema Screen (Left Column) */}
          <div className="space-y-4">
            <div className="glass-card rounded-2xl overflow-hidden shadow-2xl border border-white/15 bg-black/80">
              <div className="relative aspect-video bg-black flex items-center justify-center">
                {activeMovie ? (
                  <video
                    key={activeMovie.streamUrl}
                    ref={videoRef}
                    controls
                    autoPlay
                    playsInline
                    className="w-full h-full object-contain"
                    src={activeMovie.streamUrl}
                    onEnded={() => {
                      const currentIndex = movies.findIndex((m) => m.id === activeMovie.id);
                      if (currentIndex >= 0 && currentIndex < movies.length - 1) {
                        setActiveMovie(movies[currentIndex + 1]);
                      }
                    }}
                  >
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <div className="text-center p-8 text-slate-400">
                    <span className="text-5xl block mb-3">🎬</span>
                    <p className="text-base font-bold text-white">No Video Selected</p>
                    <p className="text-xs text-slate-400 mt-1">Choose a video from the list on the right</p>
                  </div>
                )}
              </div>

              {/* Player Controller Bar */}
              {activeMovie && (
                <div className="p-5 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-mono font-bold uppercase border border-cyan-500/30">
                        {activeMovie.extension}
                      </span>
                      <h3 className="text-lg font-bold text-white font-poppins truncate max-w-md">
                        {activeMovie.title}
                      </h3>
                    </div>
                    <div className="flex flex-wrap gap-3 text-xs text-slate-400 font-mono">
                      <span>File: {activeMovie.filename}</span>
                      {activeMovie.sizeFormatted && <span>Size: {activeMovie.sizeFormatted}</span>}
                    </div>
                  </div>

                  {/* Playback speed toggle */}
                  <div className="flex items-center gap-1.5 self-start sm:self-auto bg-black/40 p-1 rounded-xl border border-white/10 text-xs">
                    <span className="text-slate-400 px-2">Speed:</span>
                    {[0.75, 1, 1.25, 1.5, 2].map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => handleSpeedChange(s)}
                        className={`px-2 py-1 rounded-lg font-mono font-bold transition ${
                          playbackSpeed === s
                            ? 'bg-cyan-500 text-white'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        {s}x
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Keyboard shortcuts helper */}
            <div className="glass-card rounded-xl p-4 text-xs text-slate-400 flex flex-wrap items-center justify-between gap-3">
              <span>Shortcuts:</span>
              <div className="flex flex-wrap gap-3 font-mono text-[11px] text-slate-300">
                <span><kbd className="bg-white/10 px-1.5 py-0.5 rounded">Space</kbd> Play/Pause</span>
                <span><kbd className="bg-white/10 px-1.5 py-0.5 rounded">F</kbd> Fullscreen</span>
                <span><kbd className="bg-white/10 px-1.5 py-0.5 rounded">M</kbd> Mute</span>
                <span><kbd className="bg-white/10 px-1.5 py-0.5 rounded">← / →</kbd> Seek 10s</span>
              </div>
            </div>
          </div>

          {/* Video Playlist & Library (Right Column) */}
          <div className="glass-card rounded-2xl p-6 sm:p-7 space-y-5">
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-bold text-white font-poppins">Video Library</h3>
                <span className="text-xs px-2.5 py-1 rounded-lg bg-white/10 text-cyan-300 font-mono">
                  {filteredMovies.length} Videos
                </span>
              </div>

              {/* Search Bar */}
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search movies by title or filename..."
                className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-xs outline-none focus:border-cyan-400 placeholder-slate-400"
              />

              {/* Format Filters */}
              {availableExtensions.length > 2 && (
                <div className="mt-3 flex flex-wrap gap-1.5 text-xs">
                  {availableExtensions.map((fmt) => (
                    <button
                      key={fmt}
                      type="button"
                      onClick={() => setSelectedFormat(fmt)}
                      className={`px-3 py-1 rounded-lg uppercase font-mono transition ${
                        selectedFormat === fmt
                          ? 'bg-cyan-500 text-white font-bold'
                          : 'bg-white/5 text-slate-300 hover:bg-white/10'
                      }`}
                    >
                      {fmt === 'all' ? 'All Formats' : fmt}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Video List */}
            <div className="space-y-2.5 max-h-[580px] overflow-y-auto pr-1">
              <AnimatePresence>
                {filteredMovies.map((movie, idx) => {
                  const isActive = activeMovie?.id === movie.id;
                  return (
                    <motion.div
                      key={movie.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ delay: idx * 0.02 }}
                      onClick={() => setActiveMovie(movie)}
                      className={`p-3.5 rounded-xl cursor-pointer border transition flex items-center justify-between gap-3 ${
                        isActive
                          ? 'bg-gradient-to-r from-blue-600/30 to-cyan-500/20 border-cyan-400/50 shadow-md'
                          : 'bg-black/30 border-white/5 hover:border-white/20 hover:bg-black/50'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className={`w-9 h-9 rounded-lg flex items-center justify-center text-sm flex-shrink-0 ${
                            isActive
                              ? 'bg-cyan-500 text-white shadow-md'
                              : 'bg-white/10 text-slate-300'
                          }`}
                        >
                          {isActive ? '▶' : '🎬'}
                        </div>

                        <div className="min-w-0">
                          <h4
                            className={`text-xs font-bold truncate ${
                              isActive ? 'text-white' : 'text-slate-200'
                            }`}
                            title={movie.title}
                          >
                            {movie.title}
                          </h4>
                          <div className="flex items-center gap-2 text-[10px] text-slate-400 font-mono mt-0.5">
                            <span className="uppercase">{movie.extension}</span>
                            {movie.sizeFormatted && (
                              <>
                                <span>•</span>
                                <span>{movie.sizeFormatted}</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>

                      {isActive && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-400/20 text-cyan-300 font-semibold uppercase flex-shrink-0">
                          Playing
                        </span>
                      )}
                    </motion.div>
                  );
                })}
              </AnimatePresence>

              {filteredMovies.length === 0 && (
                <div className="text-center py-12 text-slate-400 text-xs">
                  <span className="text-3xl block mb-2">📁</span>
                  <p>No matching video files found.</p>
                  <p className="mt-1 text-slate-500">
                    Add video files to <code className="text-cyan-300 font-mono">repo-play</code> or click &ldquo;Select Folder&rdquo; above.
                  </p>
                </div>
              )}
            </div>

            {/* Quick guide tip card */}
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-300 space-y-1">
              <p className="font-bold text-white">How to stream on same Wi-Fi:</p>
              <p className="text-slate-400 leading-relaxed">
                Connect your phone or smart TV to the same Wi-Fi network and open{' '}
                <strong className="text-cyan-300 font-mono">http://{serverIp}:4200/movies</strong>!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Movies;
