import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import analyticsReducer from './features/analytics/analyticsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    analytics: analyticsReducer,
  },
});

store.subscribe(() => {
  if (typeof window === 'undefined') {
    return;
  }

  const state = store.getState();

  if (state.auth.user) {
    window.localStorage.setItem('miraj-auth-user', JSON.stringify(state.auth.user));
  } else {
    window.localStorage.removeItem('miraj-auth-user');
  }

  window.localStorage.setItem('miraj-dashboard-analytics', JSON.stringify(state.analytics));
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
