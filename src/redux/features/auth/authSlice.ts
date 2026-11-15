import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

const validUsernames = ['miraj', 'admin'];
const validPasswords = ['1234', 'admin', 'miraj'];

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
      const username = (action.payload.username || '').trim().toLowerCase();
      const password = (action.payload.password || '').trim();

      if (validUsernames.includes(username) && validPasswords.includes(password)) {
        const userObj: AuthUser = {
          username: username === 'admin' ? 'admin' : 'miraj',
          displayName: 'Miraj',
        };
        state.isAuthenticated = true;
        state.user = userObj;
        state.error = '';

        if (typeof window !== 'undefined') {
          try {
            window.localStorage.setItem('miraj-auth-user', JSON.stringify(userObj));
          } catch {
            // Ignore
          }
        }
        return;
      }

      state.isAuthenticated = false;
      state.user = null;
      state.error = 'Invalid username or password. Use username: miraj and password: 1234';
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.error = '';

      if (typeof window !== 'undefined') {
        try {
          window.localStorage.removeItem('miraj-auth-user');
        } catch {
          // Ignore
        }
      }
    },
    clearAuthError: (state) => {
      state.error = '';
    },
  },
});

export const { login, logout, clearAuthError } = authSlice.actions;
export default authSlice.reducer;
