import { useState, useEffect } from 'react';

const TRACKS = [
  { title: 'TIKI TIKI (Slowed)', artist: 'Unique Vibes', album: 'YouTube Funk', state: 'Listening to Spotify' },
  { title: 'Clean Architecture in TS', artist: 'Coding Session', album: 'VS Code Insiders', state: 'Coding in VS Code' },
  { title: 'SEMPERO (Super Slowed)', artist: 'SUKA.', album: 'Coding Radio', state: 'Listening to Spotify' },
];

export const LiveStatusWidget = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % TRACKS.length);
    }, 12000);
    return () => clearInterval(timer);
  }, []);

  const current = TRACKS[currentIdx];

  return (
    <div className="glass-card rounded-2xl p-4 border border-white/10 flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        {/* Animated equalizer waves */}
        <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center gap-1 p-2">
          <span className={`w-1 rounded-full bg-emerald-400 ${isPlaying ? 'h-6 animate-pulse' : 'h-2'}`} />
          <span className={`w-1 rounded-full bg-emerald-400 ${isPlaying ? 'h-4 animate-bounce' : 'h-2'}`} />
          <span className={`w-1 rounded-full bg-emerald-400 ${isPlaying ? 'h-5 animate-pulse [animation-delay:0.2s]' : 'h-2'}`} />
        </div>

        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
            <p className="text-[11px] uppercase tracking-wider text-emerald-400 font-bold font-mono">
              {current.state}
            </p>
          </div>
          <h4 className="text-xs font-bold text-white line-clamp-1">{current.title}</h4>
          <p className="text-[10px] text-slate-400">{current.artist}</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setIsPlaying(!isPlaying)}
          className="text-xs px-2.5 py-1 rounded-lg glass-button text-slate-300 hover:text-white"
        >
          {isPlaying ? 'Pause' : 'Play'}
        </button>
      </div>
    </div>
  );
};

export default LiveStatusWidget;
