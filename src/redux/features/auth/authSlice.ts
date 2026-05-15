import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

const validUsername = 'miraj';
const validPassword = '1234';

export interface AuthUser {
  username: string;
  displayName: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: AuthUser | null;
  error: string;
}

const readSavedAuth = (): AuthState => {
  if (typeof window === 'undefined') {
    return {
      isAuthenticated: false,
      user: null,
      error: '',
    };
  }

  try {
    const savedUser = JSON.parse(window.localStorage.getItem('miraj-auth-user') || 'null');

    return savedUser
      ? {
          isAuthenticated: true,
          user: savedUser,
          error: '',
        }
      : {
          isAuthenticated: false,
          user: null,
          error: '',
        };
  } catch {
    return {
      isAuthenticated: false,
      user: null,
      error: '',
    };
  }
};

const initialState: AuthState = readSavedAuth();

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ username: string; password: string }>) => {
      const username = action.payload.username.trim();

      if (username === validUsername && action.payload.password === validPassword) {
        state.isAuthenticated = true;
        state.user = {
          username,
          displayName: 'Miraj',
        };
        state.error = '';
        return;
      }

      state.isAuthenticated = false;
      state.user = null;
      state.error = 'Invalid username or password.';
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.error = '';
    },
    clearAuthError: (state) => {
      state.error = '';
    },
  },
});

export const { login, logout, clearAuthError } = authSlice.actions;
export default authSlice.reducer;
