import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ACHIEVEMENTS_LIST,
  getUnlockedAchievements,
  onAchievementUnlocked,
  unlockAchievement,
  checkNightOwl,
  type Achievement,
} from '../utils/achievements';

const KONAMI_CODE = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a',
];

export const AchievementToast = () => {
  const [currentToast, setCurrentToast] = useState<Achievement | null>(null);
  const [showDrawer, setShowDrawer] = useState(false);
  const [unlockedMap, setUnlockedMap] = useState<Record<string, string>>({});

  useEffect(() => {
    setUnlockedMap(getUnlockedAchievements());
    unlockAchievement('first_visit');
    checkNightOwl();

    const unsubscribe = onAchievementUnlocked((achievement) => {
      setCurrentToast(achievement);
      setUnlockedMap(getUnlockedAchievements());
      setTimeout(() => setCurrentToast(null), 5000);
    });

    // Konami Code sequence listener
    let konamiIndex = 0;
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      const expected = KONAMI_CODE[konamiIndex].length === 1
        ? KONAMI_CODE[konamiIndex].toLowerCase()
        : KONAMI_CODE[konamiIndex];

      if (key === expected) {
        konamiIndex += 1;
        if (konamiIndex === KONAMI_CODE.length) {
          unlockAchievement('konami_master');
          konamiIndex = 0;
        }
      } else {
        konamiIndex = 0;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      unsubscribe();
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const totalCount = ACHIEVEMENTS_LIST.length;
  const unlockedCount = Object.keys(unlockedMap).length;

  return (
    <>
      {/* Toast Notification */}
      <AnimatePresence>
        {currentToast && (
          <motion.div
            initial={{ opacity: 0, y: -40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className="fixed top-20 right-6 z-50 glass-card rounded-2xl p-4 border border-amber-400/40 shadow-2xl flex items-center gap-3 cursor-pointer max-w-sm"
            onClick={() => setShowDrawer(true)}
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-2xl shadow-lg flex-shrink-0">
              {currentToast.icon}
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-amber-300 font-bold">
                Achievement Unlocked! 🏆
              </p>
              <h4 className="text-sm font-bold text-white">{currentToast.title}</h4>
              <p className="text-xs text-slate-300 line-clamp-1">{currentToast.description}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Trophy Pill Trigger */}
      <button
        type="button"
        onClick={() => setShowDrawer(true)}
        className="fixed bottom-6 left-6 z-40 glass-button px-3.5 py-2 rounded-full flex items-center gap-2 text-xs font-semibold text-white hover:scale-105 transition duration-300 shadow-xl border border-white/20"
        title="View Achievements"
      >
        <span className="text-base">🏆</span>
        <span>{unlockedCount}/{totalCount}</span>
      </button>

      {/* Achievements Modal Drawer */}
      <AnimatePresence>
        {showDrawer && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xl p-4 sm:p-6 flex items-center justify-center"
            onClick={() => setShowDrawer(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="glass-card rounded-3xl max-w-2xl w-full p-6 sm:p-8 max-h-[85vh] overflow-y-auto border border-white/20 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-300 flex items-center justify-center text-2xl border border-amber-500/30">
                    🏆
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white font-poppins">Portfolio Badges</h3>
                    <p className="text-xs text-slate-300">
                      Unlocked {unlockedCount} of {totalCount} secret achievements
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowDrawer(false)}
                  className="w-9 h-9 rounded-full glass-button flex items-center justify-center text-slate-300 hover:text-white"
                >
                  ✕
                </button>
              </div>

              {/* Progress Bar */}
              <div className="mb-6">
                <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500 transition-all duration-500"
                    style={{ width: `${(unlockedCount / totalCount) * 100}%` }}
                  />
                </div>
              </div>

              {/* Badges List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {ACHIEVEMENTS_LIST.map((ach) => {
                  const isUnlocked = Boolean(unlockedMap[ach.id]);
                  return (
                    <div
                      key={ach.id}
                      className={`p-3.5 rounded-2xl border transition ${
                        isUnlocked
                          ? 'bg-amber-500/10 border-amber-500/30'
                          : 'bg-white/5 border-white/5 opacity-50'
                      } flex items-center gap-3`}
                    >
                      <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-xl flex-shrink-0">
                        {isUnlocked ? ach.icon : '🔒'}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1">
                          <h4 className="text-xs font-bold text-white truncate">{ach.title}</h4>
                          {isUnlocked && (
                            <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono">
                              Unlocked
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-2">
                          {isUnlocked ? ach.description : 'Explore the site to discover this badge.'}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <p className="mt-6 text-center text-xs text-slate-400 italic">
                Tip: Try the Konami Code (↑ ↑ ↓ ↓ ← → ← → B A) on your keyboard!
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
