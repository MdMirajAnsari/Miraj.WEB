import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface PageVisit {
  path: string;
  label: string;
  count: number;
  lastVisitedAt: string;
}

export interface BlogRead {
  id: number;
  title: string;
  category: string;
  readTime: number;
  count: number;
  lastReadAt: string;
}

export interface VideoWatch {
  id: number;
  title: string;
  category: string;
  count: number;
  lastWatchedAt: string;
}

export interface ActivityItem {
  id: string;
  type: 'visit' | 'blog' | 'video';
  title: string;
  meta: string;
  createdAt: string;
}

interface AnalyticsState {
  totalVisits: number;
  totalBlogReads: number;
  totalVideoWatches: number;
  pageVisits: PageVisit[];
  blogReads: BlogRead[];
  videoWatches: VideoWatch[];
  recentActivity: ActivityItem[];
}

const initialAnalyticsState: AnalyticsState = {
  totalVisits: 0,
  totalBlogReads: 0,
  totalVideoWatches: 0,
  pageVisits: [],
  blogReads: [],
  videoWatches: [],
  recentActivity: [],
};

const readSavedAnalytics = (): AnalyticsState => {
  if (typeof window === 'undefined') {
    return initialAnalyticsState;
  }

  try {
    return {
      ...initialAnalyticsState,
      ...JSON.parse(window.localStorage.getItem('miraj-dashboard-analytics') || '{}'),
    };
  } catch {
    return initialAnalyticsState;
  }
};

const addActivity = (
  state: AnalyticsState,
  activity: Omit<ActivityItem, 'id' | 'createdAt'>,
  createdAt: string,
) => {
  state.recentActivity = [
    {
      ...activity,
      id: `${activity.type}-${createdAt}-${Math.random().toString(36).slice(2, 8)}`,
      createdAt,
    },
    ...state.recentActivity,
  ].slice(0, 10);
};

const analyticsSlice = createSlice({
  name: 'analytics',
  initialState: readSavedAnalytics(),
  reducers: {
    recordPageVisit: (state, action: PayloadAction<{ path: string; label: string }>) => {
      const now = new Date().toISOString();
      const existingVisit = state.pageVisits.find((visit) => visit.path === action.payload.path);

      state.totalVisits += 1;

      if (existingVisit) {
        existingVisit.count += 1;
        existingVisit.label = action.payload.label;
        existingVisit.lastVisitedAt = now;
      } else {
        state.pageVisits.push({
          ...action.payload,
          count: 1,
          lastVisitedAt: now,
        });
      }

      addActivity(
        state,
        {
          type: 'visit',
          title: `Visited ${action.payload.label}`,
          meta: action.payload.path,
        },
        now,
      );
    },
    recordBlogRead: (state, action: PayloadAction<{ id: number; title: string; category: string; readTime: number }>) => {
      const now = new Date().toISOString();
      const existingBlog = state.blogReads.find((blog) => blog.id === action.payload.id);

      state.totalBlogReads += 1;

      if (existingBlog) {
        existingBlog.count += 1;
        existingBlog.lastReadAt = now;
      } else {
        state.blogReads.push({
          ...action.payload,
          count: 1,
          lastReadAt: now,
        });
      }

      addActivity(
        state,
        {
          type: 'blog',
          title: action.payload.title,
          meta: `${action.payload.category} | ${action.payload.readTime} min read`,
        },
        now,
      );
    },
    recordVideoWatch: (state, action: PayloadAction<{ id: number; title: string; category: string }>) => {
      const now = new Date().toISOString();
      const existingVideo = state.videoWatches.find((video) => video.id === action.payload.id);

      state.totalVideoWatches += 1;

      if (existingVideo) {
        existingVideo.count += 1;
        existingVideo.lastWatchedAt = now;
      } else {
        state.videoWatches.push({
          ...action.payload,
          count: 1,
          lastWatchedAt: now,
        });
      }

      addActivity(
        state,
        {
          type: 'video',
          title: action.payload.title,
          meta: action.payload.category,
        },
        now,
      );
    },
    resetAnalytics: () => initialAnalyticsState,
  },
});

export const { recordPageVisit, recordBlogRead, recordVideoWatch, resetAnalytics } = analyticsSlice.actions;
export default analyticsSlice.reducer;
