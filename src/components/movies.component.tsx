import { useEffect, useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { styles } from '../styles';
import { textVariant } from '../utils/motion';
import type { RepoMovie } from '../models';
import {
  saveSavedDirectoryHandle,
  getSavedDirectoryHandle,
} from '../utils/repoPlayStorage';

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
const DEFAULT_TUNNEL_ENDPOINT = 'https://increased-look-complications-bet.trycloudflare.com';
const VIDEO_EXTENSIONS = ['.mp4', '.webm', '.mkv', '.mov', '.m4v', '.ogv', '.avi'];

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
}

// Prefer MP4 container over MKV when both exist for maximum browser compatibility
function deduplicateMovies(list: RepoMovie[]): RepoMovie[] {
  const map = new Map<string, RepoMovie>();
  list.forEach((m) => {
    const key = m.title.toLowerCase().replace(/\s+(mp4|mkv)$/, '');
    const existing = map.get(key);
    if (!existing) {
      map.set(key, m);
    } else {
      if (m.extension.toLowerCase() === 'mp4' && existing.extension.toLowerCase() !== 'mp4') {
        map.set(key, m);
      }
    }
  });
  return Array.from(map.values());
}

const Movies = () => {
  const [movies, setMovies] = useState<RepoMovie[]>([]);
  const [activeMovie, setActiveMovie] = useState<RepoMovie | null>(null);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFormat, setSelectedFormat] = useState('all');
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [connectionStatus, setConnectionStatus] = useState<'connected' | 'disconnected' | 'browser-folder'>('disconnected');
  const [serverDirectory, setServerDirectory] = useState('C:\\Users\\Miraj\\source\\repos\\repo-play');
  const [showNetworkModal, setShowNetworkModal] = useState(false);
  const [isHosted, setIsHosted] = useState(false);
  const [hostname, setHostname] = useState('');
  const [savedHandle, setSavedHandle] = useState<FileSystemDirectoryHandle | null>(null);
  const [needsPermissionGrant, setNeedsPermissionGrant] = useState(false);
  const [videoError, setVideoError] = useState<string | null>(null);

  // Custom Media Server Endpoint (reads URL query ?endpoint=... or stored value or default Cloudflare tunnel)
  const [customEndpoint, setCustomEndpoint] = useState(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const paramEp = params.get('endpoint');
      if (paramEp) {
        const cleanParam = paramEp.trim().replace(/\/$/, '');
        window.localStorage.setItem(STORAGE_ENDPOINT_KEY, cleanParam);
        return cleanParam;
      }
      const saved = window.localStorage.getItem(STORAGE_ENDPOINT_KEY);
      if (saved) return saved;
      // Default to active Cloudflare stream if accessed online
      if (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
        return DEFAULT_TUNNEL_ENDPOINT;
      }
    }
    return '';
  });

  const videoRef = useRef<HTMLVideoElement>(null);
  const folderInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isExternalHost = window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1';
      setIsHosted(isExternalHost);
      setHostname(window.location.hostname);

      // Keep address bar clean: remove bulky ?endpoint= query string once saved
      const params = new URLSearchParams(window.location.search);
      if (params.has('endpoint')) {
        params.delete('endpoint');
        const remainingQuery = params.toString() ? `?${params.toString()}` : '';
        const newUrl = `${window.location.pathname}${remainingQuery}${window.location.hash}`;
        window.history.replaceState({}, '', newUrl);
      }
    }
  }, []);

  // Process a list of File objects into RepoMovie objects
  const processFiles = useCallback((files: File[]) => {
    const loadedList: RepoMovie[] = [];

    files.forEach((file, idx) => {
      const name = file.name;
      const ext = name.substring(name.lastIndexOf('.')).toLowerCase();

      if (VIDEO_EXTENSIONS.includes(ext)) {
        let playableBlob: Blob = file;
        // Fix for Windows Chrome/Edge: explicitly tag blob MIME type for .mkv and .mp4
        if (!file.type || file.type === 'application/octet-stream') {
          const mimeType = ext === '.mkv' ? 'video/x-matroska' : ext === '.webm' ? 'video/webm' : 'video/mp4';
          playableBlob = file.slice(0, file.size, mimeType);
        }

        const streamUrl = URL.createObjectURL(playableBlob);
        const cleanTitle = name.replace(/\.[^/.]+$/, '').replace(/[-_.]+/g, ' ').trim();

        loadedList.push({
          id: `browser-file-${idx}-${file.name}`,
          filename: file.name,
          title: cleanTitle,
          extension: ext.replace('.', ''),
          size: file.size,
          sizeFormatted: formatFileSize(file.size),
          modified: new Date(file.lastModified).toISOString(),
          streamUrl,
          isLocalFile: true,
        });
      }
    });

    if (loadedList.length > 0) {
      const deduped = deduplicateMovies(loadedList);
      deduped.sort((a, b) => a.title.localeCompare(b.title));
      setMovies(deduped);
      setActiveMovie(deduped[0]);
      setConnectionStatus('browser-folder');
      setServerDirectory('C:\\Users\\Miraj\\source\\repos\\repo-play (Connected via Browser)');
      setVideoError(null);
    }
  }, []);

  // Read files from a DirectoryHandle
  const readFilesFromHandle = useCallback(
    async (handle: FileSystemDirectoryHandle) => {
      try {
        setLoading(true);
        const collectedFiles: File[] = [];

        for await (const entry of (handle as any).values()) {
          if (entry.kind === 'file') {
            const file = await entry.getFile();
            const ext = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
            if (VIDEO_EXTENSIONS.includes(ext)) {
              collectedFiles.push(file);
            }
          }
        }

        if (collectedFiles.length > 0) {
          processFiles(collectedFiles);
          setNeedsPermissionGrant(false);
        }
      } catch (err) {
        console.warn('Error reading files from directory handle', err);
      } finally {
        setLoading(false);
      }
    },
    [processFiles],
  );

  // Modern File System Access API (showDirectoryPicker)
  const handleOpenDirectoryPicker = async () => {
    if (typeof window !== 'undefined' && 'showDirectoryPicker' in window) {
      try {
        // @ts-expect-error showDirectoryPicker is standard in Chromium
        const dirHandle: FileSystemDirectoryHandle = await window.showDirectoryPicker({ mode: 'read' });
        setSavedHandle(dirHandle);
        await saveSavedDirectoryHandle(dirHandle);
        await readFilesFromHandle(dirHandle);
        return;
      } catch (err) {
        if (err instanceof DOMException && err.name === 'AbortError') return;
      }
    }

    // Fallback to directory input
    folderInputRef.current?.click();
  };

  // Re-authorize stored folder handle
  const handleAuthorizeSavedHandle = async () => {
    if (!savedHandle) return;
    try {
      // @ts-expect-error requestPermission is standard in Chromium
      const perm = await savedHandle.requestPermission({ mode: 'read' });
      if (perm === 'granted') {
        await readFilesFromHandle(savedHandle);
      }
    } catch {
      handleOpenDirectoryPicker();
    }
  };

  // Standard input file directory picker fallback
  const handleFolderInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    processFiles(Array.from(files));
  };

  // Fetch movies from server endpoints (LAN server or tunnel)
  const fetchMoviesFromEndpoint = useCallback(
    async (customUrl: string = customEndpoint) => {
      setLoading(true);

      const endpointsToTry: string[] = [];

      if (customUrl.trim()) {
        endpointsToTry.push(customUrl.trim().replace(/\/$/, ''));
      }

      // If running on localhost
      if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
        endpointsToTry.push('');
        endpointsToTry.push('http://localhost:4201');
        endpointsToTry.push('http://127.0.0.1:4201');
      }

      let success = false;

      for (const host of endpointsToTry) {
        try {
          const url = `${host}/api/movies`;
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 2500);

          const res = await fetch(url, { signal: controller.signal });
          clearTimeout(timeoutId);

          const contentType = res.headers.get('content-type') || '';
          if (res.ok && contentType.includes('application/json')) {
            const data = await res.json();
            if (data && Array.isArray(data.movies)) {
              setConnectionStatus('connected');
              if (data.directory) setServerDirectory(data.directory);

              const list: RepoMovie[] = data.movies.map((m: RepoMovie) => ({
                ...m,
                streamUrl: host ? `${host}${m.streamUrl}` : m.streamUrl,
              }));

              const deduped = deduplicateMovies(list);
              if (deduped.length > 0) {
                setMovies(deduped);
                setActiveMovie((prev) => prev || deduped[0]);
              } else {
                setMovies(SAMPLE_FALLBACK_MOVIES);
                setActiveMovie((prev) => prev || SAMPLE_FALLBACK_MOVIES[0]);
              }

              success = true;
              break;
            }
          }
        } catch {
          // Continue to next endpoint
        }
      }

      if (!success) {
        setConnectionStatus((prev) => (prev === 'browser-folder' ? 'browser-folder' : 'disconnected'));
        if (movies.length === 0) {
          setMovies(SAMPLE_FALLBACK_MOVIES);
          setActiveMovie(SAMPLE_FALLBACK_MOVIES[0]);
        }
      }

      setLoading(false);
    },
    [customEndpoint, movies.length],
  );

  // Check for saved IndexedDB folder handle on initial mount
  useEffect(() => {
    const initPersistence = async () => {
      try {
        const handle = await getSavedDirectoryHandle();
        if (handle) {
          setSavedHandle(handle);
          // @ts-expect-error queryPermission is standard in Chromium
          const perm = await handle.queryPermission({ mode: 'read' });
          if (perm === 'granted') {
            await readFilesFromHandle(handle);
            return;
          } else {
            setNeedsPermissionGrant(true);
          }
        }
      } catch {
        // Fall through
      }
      fetchMoviesFromEndpoint();
    };

    initPersistence();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSaveEndpoint = () => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_ENDPOINT_KEY, customEndpoint.trim());
    }
    fetchMoviesFromEndpoint(customEndpoint);
    setShowNetworkModal(false);
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
    <div id="movies" className="relative z-0 min-h-screen pt-[120px] pb-20">
      <div className={`${styles.padding} max-w-7xl mx-auto`}>
        {/* Header */}
        <motion.div
          variants={textVariant()}
          initial="hidden"
          animate="show"
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-6"
        >
          <div>
            <p className={`${styles.sectionSubText}`}>Personal Cinema & Video Player</p>
            <h2 className={`${styles.sectionHeadTextLight}`}>Repo Play.</h2>
            <p className="mt-2 text-taupe text-[16px] max-w-2xl">
              Stream movies directly from your local{' '}
              <code className="text-cyan-300 font-mono bg-white/10 px-2 py-0.5 rounded text-xs">
                repo-play
              </code>{' '}
              folder, across your home Wi-Fi network, or on this hosted app with zero cloud upload.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Primary Connect Button */}
            <button
              onClick={handleOpenDirectoryPicker}
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 text-white font-poppins font-bold text-sm shadow-xl hover:scale-105 transition-all duration-300 flex items-center gap-2"
              title="Select C:\Users\Miraj\source\repos\repo-play"
            >
              <span>📁</span>
              <span>Connect repo-play Folder</span>
            </button>

            {/* Choose Individual Files fallback */}
            <button
              onClick={() => fileInputRef.current?.click()}
              className="glass-button px-4 py-3 rounded-xl text-xs font-semibold text-white flex items-center gap-2 hover:bg-white/10 transition"
              title="Pick individual video files (.mkv, .mp4, etc.)"
            >
              <span>🎬</span>
              <span>Pick Video Files</span>
            </button>

            <button
              onClick={() => fetchMoviesFromEndpoint()}
              disabled={loading}
              className="glass-button px-4 py-3 rounded-xl text-xs font-semibold text-white flex items-center gap-2 hover:bg-white/10 transition"
              title="Rescan connected media server"
            >
              <span>🔄</span>
              <span>{loading ? 'Scanning...' : 'Refresh'}</span>
            </button>

            <button
              onClick={() => setShowNetworkModal(true)}
              className="glass-button px-4 py-3 rounded-xl text-xs font-semibold text-cyan-300 border border-cyan-500/30 flex items-center gap-2 hover:bg-white/10 transition"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Network & Server Setup</span>
            </button>

            {/* Hidden file inputs */}
            <input
              ref={folderInputRef}
              type="file"
              // @ts-expect-error webkitdirectory is standard in browsers
              webkitdirectory=""
              directory=""
              multiple
              className="hidden"
              onChange={handleFolderInputChange}
            />
            <input
              ref={fileInputRef}
              type="file"
              accept="video/*,.mkv,.mp4,.webm,.mov,.avi"
              multiple
              className="hidden"
              onChange={handleFolderInputChange}
            />
          </div>
        </motion.div>

        {/* 1-Click Reconnect Banner (when user previously chose repo-play) */}
        {needsPermissionGrant && (
          <div className="mt-6 p-4 rounded-2xl bg-gradient-to-r from-cyan-900/60 via-blue-900/40 to-black/80 border border-cyan-400/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl animate-bounce">⚡</span>
              <div>
                <h4 className="font-bold text-white text-sm">Resume Previous repo-play Session</h4>
                <p className="text-xs text-slate-300">
                  Click to re-authorize browser access to your saved movies folder.
                </p>
              </div>
            </div>
            <button
              onClick={handleAuthorizeSavedHandle}
              className="px-5 py-2.5 rounded-xl bg-cyan-400 text-black font-poppins font-bold text-xs uppercase tracking-wider hover:bg-cyan-300 whitespace-nowrap transition"
            >
              Authorize & Load Movies
            </button>
          </div>
        )}

        {/* Hosted Alert / Guidance Banner (when on Vercel) */}
        {isHosted && connectionStatus !== 'connected' && connectionStatus !== 'browser-folder' && (
          <div className="mt-6 p-6 rounded-2xl bg-gradient-to-r from-blue-900/40 via-purple-900/30 to-black/70 border border-cyan-500/40 space-y-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xl">🌐</span>
                <h4 className="font-bold text-white text-sm">
                  Connecting to your PC from the Hosted App ({hostname || 'mirajai.vercel.app'})
                </h4>
              </div>
              <p className="text-xs text-slate-300">
                Because Vercel is hosted on the internet, browsers block direct calls to local IP addresses (<code className="text-cyan-300 font-mono">192.168.x.x</code>) due to HTTPS Mixed Content security. Choose one of two instant ways to watch your videos:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
              {/* Method 1: Browser Native Folder (0 setup) */}
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex flex-col justify-between gap-3">
                <div className="space-y-1">
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 uppercase font-mono font-bold">
                    Method 1: Direct Disk Access
                  </span>
                  <h5 className="font-bold text-white text-xs mt-1">Connect C:\Users\Miraj\source\repos\repo-play</h5>
                  <p className="text-[11px] text-slate-400">
                    Reads videos directly on your computer without uploading. Plays 1080p/4K instantly with 0 cloud data usage!
                  </p>
                </div>
                <button
                  onClick={handleOpenDirectoryPicker}
                  className="px-4 py-2.5 rounded-xl bg-cyan-500 text-black font-poppins font-bold text-xs uppercase tracking-wider hover:bg-cyan-400 whitespace-nowrap transition"
                >
                  📁 Connect repo-play Folder
                </button>
              </div>

              {/* Method 2: Cloudflare Live Stream URL */}
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex flex-col justify-between gap-3">
                <div className="space-y-1">
                  <span className="text-[10px] px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 uppercase font-mono font-bold">
                    Method 2: Live Cloud Stream
                  </span>
                  <h5 className="font-bold text-white text-xs mt-1">HTTPS Stream Tunnel from your PC</h5>
                  <p className="text-[11px] text-slate-400">
                    Enter your Cloudflare tunnel URL (run <code className="text-cyan-300 font-mono">npm run media:cloud</code> on your PC):
                  </p>
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={customEndpoint}
                    onChange={(e) => setCustomEndpoint(e.target.value)}
                    placeholder="https://...trycloudflare.com"
                    className="flex-1 px-3 py-2 rounded-xl bg-black/60 border border-white/15 text-white font-mono text-xs outline-none focus:border-cyan-400"
                  />
                  <button
                    onClick={() => handleSaveEndpoint()}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-xs whitespace-nowrap hover:opacity-90 transition"
                  >
                    Connect
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Directory Connection Status Banner */}
        <div className="mt-6 p-4 rounded-2xl bg-black/40 border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5">
            <span
              className={`w-2.5 h-2.5 rounded-full ${
                connectionStatus === 'connected' || connectionStatus === 'browser-folder'
                  ? 'bg-emerald-400 animate-pulse'
                  : 'bg-amber-400'
              }`}
            />
            <span className="text-slate-300">
              Active Source:{' '}
              <strong className="text-white font-mono">{serverDirectory}</strong>
            </span>
          </div>

          <div className="flex items-center gap-3 text-slate-400">
            <span>{movies.length} videos loaded</span>
            <span className="text-white/20">•</span>
            <span className="text-cyan-300 font-mono">
              {connectionStatus === 'browser-folder'
                ? 'Direct Local Stream (100% Private, 0 Cloud Bandwidth)'
                : connectionStatus === 'connected'
                ? 'Live LAN Media Stream'
                : 'Demo Mode (Click Connect Folder)'}
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
                      Connecting Videos on Vercel & Same Network
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
                  {/* Option 1: 1-Click Browser Connection */}
                  <div className="p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="font-bold text-sm text-white">⚡ Method 1: Instant Local Folder Connection</p>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 uppercase font-mono">
                        Recommended for Vercel
                      </span>
                    </div>
                    <p className="text-slate-300">
                      Works on your hosted site (<code className="text-white">mirajai.vercel.app</code>) immediately without needing any local server or port forwarding:
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setShowNetworkModal(false);
                        handleOpenDirectoryPicker();
                      }}
                      className="px-4 py-2 rounded-lg bg-cyan-400 text-black font-bold text-xs hover:bg-cyan-300 transition"
                    >
                      Select C:\Users\Miraj\source\repos\repo-play
                    </button>
                  </div>

                  {/* Option 2: Same Wi-Fi Network Access */}
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="font-bold text-sm text-white">📱 Method 2: Watch on Phone or TV on Same Wi-Fi</p>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 uppercase font-mono">
                        Zero Config
                      </span>
                    </div>
                    <p className="text-slate-400 leading-relaxed">
                      While your PC runs <code className="text-white">npm start</code>, open this URL on your phone or smart TV connected to the same Wi-Fi:
                    </p>
                    <div className="p-2.5 rounded-lg bg-black/60 border border-white/10 text-cyan-300 font-mono text-center text-sm font-bold">
                      http://192.168.1.8:4200/movies
                    </div>
                    <p className="text-[11px] text-slate-400">
                      Your phone will stream all movies directly from your PC at maximum Wi-Fi speeds without any cloud lag!
                    </p>
                  </div>

                  {/* Option 3: HTTPS Tunnel URL */}
                  <div className="space-y-2 p-4 rounded-xl bg-white/5 border border-white/10">
                    <p className="font-bold text-sm text-white">🌐 Method 3: Remote Media Server (localtunnel / ngrok)</p>
                    <p className="text-slate-400 leading-relaxed">
                      To stream from your PC to <code className="text-white">mirajai.vercel.app</code> from anywhere outside your home, start an HTTPS tunnel:
                    </p>
                    <code className="block p-2 rounded bg-black/50 text-cyan-300 font-mono text-[11px]">
                      npx localtunnel --port 4201
                    </code>
                    <div className="flex gap-2 pt-1">
                      <input
                        type="text"
                        value={customEndpoint}
                        onChange={(e) => setCustomEndpoint(e.target.value)}
                        placeholder="https://your-tunnel.loca.lt"
                        className="flex-1 px-3 py-2 rounded-xl bg-black/50 border border-white/15 text-white font-mono text-xs outline-none focus:border-cyan-400"
                      />
                      <button
                        onClick={handleSaveEndpoint}
                        className="glass-button-active px-4 py-2 rounded-xl font-semibold text-white"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    onClick={() => setShowNetworkModal(false)}
                    className="glass-button px-5 py-2 rounded-xl text-xs text-white"
                  >
                    Close
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
                  <>
                    <video
                      key={activeMovie.streamUrl}
                      ref={videoRef}
                      controls
                      autoPlay
                      playsInline
                      className="w-full h-full object-contain"
                      src={activeMovie.streamUrl}
                      onError={() => {
                        setVideoError('codec_or_container');
                      }}
                      onPlay={() => setVideoError(null)}
                      onEnded={() => {
                        const currentIndex = movies.findIndex((m) => m.id === activeMovie.id);
                        if (currentIndex >= 0 && currentIndex < movies.length - 1) {
                          setActiveMovie(movies[currentIndex + 1]);
                        }
                      }}
                    >
                      Your browser does not support the video tag.
                    </video>

                    {/* Codec / Audio Notice Overlay if video playback reports an error */}
                    {videoError && (
                      <div className="absolute inset-0 z-10 bg-black/90 p-6 flex flex-col items-center justify-center text-center space-y-3">
                        <span className="text-4xl">⚠️</span>
                        <h4 className="text-sm font-bold text-white">Browser Codec Notice</h4>
                        <p className="text-xs text-slate-300 max-w-md leading-relaxed">
                          This video file (<code className="text-cyan-300 font-mono">{activeMovie.filename}</code>) uses a container or audio codec (such as Dolby Digital AC-3 or DTS 5.1) that Chrome cannot decode natively.
                        </p>
                        <div className="flex flex-wrap gap-2 justify-center pt-2">
                          <button
                            onClick={() => window.open(activeMovie.streamUrl, '_blank')}
                            className="px-4 py-2 rounded-xl bg-cyan-500 text-black font-bold text-xs hover:bg-cyan-400 transition"
                          >
                            Open in Desktop Player / New Tab
                          </button>
                          <button
                            onClick={() => setVideoError(null)}
                            className="px-4 py-2 rounded-xl glass-button text-white text-xs hover:bg-white/10 transition"
                          >
                            Dismiss
                          </button>
                        </div>
                      </div>
                    )}
                  </>
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
                      onClick={() => {
                        setActiveMovie(movie);
                        setVideoError(null);
                      }}
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
                    Click <strong className="text-white">&ldquo;Connect repo-play Folder&rdquo;</strong> to load your movies.
                  </p>
                </div>
              )}
            </div>

            {/* Quick guide tip card */}
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-300 space-y-1">
              <p className="font-bold text-white">How to watch videos here:</p>
              <p className="text-slate-400 leading-relaxed">
                Click <strong className="text-cyan-300">Connect repo-play Folder</strong> and choose your local folder. All movies will load instantly in 1080p/4K directly in your browser!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Movies;
