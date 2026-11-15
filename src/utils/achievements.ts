// Achievements and Gamification Engine for Miraj.WEB

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: string;
}

export const ACHIEVEMENTS_LIST: Achievement[] = [
  {
    id: 'first_visit',
    title: 'First Footprint',
    description: 'Visited the portfolio for the first time.',
    icon: '🚀',
  },
  {
    id: 'domain_hunter',
    title: 'Domain Hunter',
    description: 'Searched domain registries and DNS with DomainsDB.',
    icon: '🌐',
  },
  {
    id: 'art_connoisseur',
    title: 'Art Connoisseur',
    description: 'Explored museum masterpieces from Art Institute of Chicago.',
    icon: '🎨',
  },
  {
    id: 'holiday_planner',
    title: 'Holiday Planner',
    description: 'Checked global public holidays on the Gov portal.',
    icon: '🗓️',
  },
  {
    id: 'crypto_analyst',
    title: 'Crypto Analyst',
    description: 'Inspected live crypto & DeFi market rates on Dashboard.',
    icon: '📈',
  },
  {
    id: 'admin_access',
    title: 'Admin Access',
    description: 'Successfully signed into the private dashboard.',
    icon: '🔑',
  },
  {
    id: 'terminal_hacker',
    title: 'Terminal Hacker',
    description: 'Accessed the interactive hacker CLI terminal.',
    icon: '💻',
  },
  {
    id: 'konami_master',
    title: 'Retro Gamer',
    description: 'Triggered the secret Konami Code sequence!',
    icon: '🕹️',
  },
  {
    id: 'night_owl',
    title: 'Night Owl',
    description: 'Explored code and projects between 12 AM and 5 AM.',
    icon: '🦉',
  },
  {
    id: 'bookworm',
    title: 'Bookworm',
    description: 'Browsed developer literature in Open Library.',
    icon: '📚',
  },
  {
    id: 'ai_collaborator',
    title: 'AI Collaborator',
    description: 'Engaged in a conversation with the Ask Miraj AI.',
    icon: '🤖',
  },
];

const STORAGE_KEY = 'miraj-unlocked-achievements';
type Listener = (achievement: Achievement) => void;
const listeners: Listener[] = [];

export const getUnlockedAchievements = (): Record<string, string> => {
  if (typeof window === 'undefined') return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
};

export const unlockAchievement = (id: string): Achievement | null => {
  if (typeof window === 'undefined') return null;

  const unlocked = getUnlockedAchievements();
  if (unlocked[id]) return null; // already unlocked

  const achievement = ACHIEVEMENTS_LIST.find((a) => a.id === id);
  if (!achievement) return null;

  const now = new Date().toISOString();
  unlocked[id] = now;

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(unlocked));
  } catch {
    // Ignore storage errors
  }

  const result = { ...achievement, unlockedAt: now };
  listeners.forEach((fn) => fn(result));
  return result;
};

export const onAchievementUnlocked = (listener: Listener) => {
  listeners.push(listener);
  return () => {
    const idx = listeners.indexOf(listener);
    if (idx >= 0) listeners.splice(idx, 1);
  };
};

export const checkNightOwl = () => {
  const hour = new Date().getHours();
  if (hour >= 0 && hour < 5) {
    unlockAchievement('night_owl');
  }
};
