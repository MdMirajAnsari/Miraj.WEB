export const integrations = {
  github: {
    username: import.meta.env.VITE_GITHUB_USERNAME || 'MdMirajAnsari',
    token: import.meta.env.VITE_GITHUB_TOKEN || '',
  },
  giscus: {
    repo: import.meta.env.VITE_GISCUS_REPO || '',
    repoId: import.meta.env.VITE_GISCUS_REPO_ID || '',
    category: import.meta.env.VITE_GISCUS_CATEGORY || 'General',
    categoryId: import.meta.env.VITE_GISCUS_CATEGORY_ID || '',
  },
  pagefind: {
    enabled: import.meta.env.VITE_PAGEFIND_ENABLED !== 'false',
  },
  supabase: {
    url: import.meta.env.VITE_SUPABASE_URL || '',
    anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY || '',
  },
  umami: {
    websiteId: import.meta.env.VITE_UMAMI_WEBSITE_ID || '',
    scriptUrl: import.meta.env.VITE_UMAMI_SCRIPT_URL || 'https://cloud.umami.is/script.js',
  },
  weather: {
    location: import.meta.env.VITE_WEATHER_LOCATION || 'Bengaluru',
    latitude: import.meta.env.VITE_WEATHER_LATITUDE || '',
    longitude: import.meta.env.VITE_WEATHER_LONGITUDE || '',
  },
};

export const isSupabaseConfigured = Boolean(integrations.supabase.url && integrations.supabase.anonKey);
export const isGiscusConfigured = Boolean(
  integrations.giscus.repo &&
    integrations.giscus.repoId &&
    integrations.giscus.categoryId,
);
export const isUmamiConfigured = Boolean(integrations.umami.websiteId && integrations.umami.scriptUrl);

export const githubHeaders = () => ({
  Accept: 'application/vnd.github+json',
  ...(integrations.github.token ? { Authorization: `Bearer ${integrations.github.token}` } : {}),
});

export const trackUmamiEvent = (eventName: string, data?: Record<string, unknown>) => {
  if (typeof window === 'undefined') return;

  const umami = (window as typeof window & {
    umami?: {
      track?: (name: string, data?: Record<string, unknown>) => void;
    };
  }).umami;

  umami?.track?.(eventName, data);
};

const supabaseHeaders = {
  apikey: integrations.supabase.anonKey,
  Authorization: `Bearer ${integrations.supabase.anonKey}`,
  'Content-Type': 'application/json',
  Prefer: 'return=representation',
};

export interface BlogEngagement {
  likes: number;
  bookmarks: number;
}

export const getBlogEngagement = async (postId: number): Promise<BlogEngagement> => {
  if (!isSupabaseConfigured) {
    return { likes: 0, bookmarks: 0 };
  }

  const response = await fetch(
    `${integrations.supabase.url}/rest/v1/blog_engagement?post_id=eq.${postId}&select=likes,bookmarks&limit=1`,
    { headers: supabaseHeaders },
  );

  if (!response.ok) {
    throw new Error('Unable to load blog engagement');
  }

  const rows = await response.json();
  return rows?.[0] || { likes: 0, bookmarks: 0 };
};

export const saveBlogEngagement = async (postId: number, engagement: BlogEngagement) => {
  if (!isSupabaseConfigured) {
    return engagement;
  }

  const response = await fetch(`${integrations.supabase.url}/rest/v1/blog_engagement?on_conflict=post_id`, {
    method: 'POST',
    headers: supabaseHeaders,
    body: JSON.stringify({
      post_id: postId,
      likes: engagement.likes,
      bookmarks: engagement.bookmarks,
      updated_at: new Date().toISOString(),
    }),
  });

  if (!response.ok) {
    throw new Error('Unable to save blog engagement');
  }

  const rows = await response.json();
  return rows?.[0] || engagement;
};

export const subscribeToNewsletter = async (email: string) => {
  if (!isSupabaseConfigured) {
    const subscribers = JSON.parse(window.localStorage.getItem('miraj-newsletter-subscribers') || '[]');
    window.localStorage.setItem('miraj-newsletter-subscribers', JSON.stringify([...new Set([email, ...subscribers])]));
    return;
  }

  const response = await fetch(`${integrations.supabase.url}/rest/v1/newsletter_subscribers?on_conflict=email`, {
    method: 'POST',
    headers: supabaseHeaders,
    body: JSON.stringify({
      email,
      source: 'portfolio-blog',
      created_at: new Date().toISOString(),
    }),
  });

  if (!response.ok) {
    throw new Error('Unable to subscribe right now');
  }
};
