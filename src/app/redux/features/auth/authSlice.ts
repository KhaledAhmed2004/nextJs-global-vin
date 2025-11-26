import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User, AuthState } from "@/types/auth.types";

// Load token from localStorage if available
const loadTokenFromStorage = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('authToken');
  }
  return null;
};

// Load user from localStorage if available
const loadUserFromStorage = (): User | null => {
  if (typeof window !== 'undefined') {
    const userStr = localStorage.getItem('authUser');
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch {
        return null;
      }
    }
  }
  return null;
};

const initialState: AuthState = {
  token: loadTokenFromStorage(),
  user: loadUserFromStorage(),
  isAuthenticated: !!loadTokenFromStorage(),
  isLoading: false,
  impersonating: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      state.isAuthenticated = true;
      // Persist token to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('authToken', action.payload);
      }
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      // Persist user to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('authUser', JSON.stringify(action.payload));
      }
    },
    setAuth: (state, action: PayloadAction<{ token: string; user: User }>) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isAuthenticated = true;
      // Persist to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('authToken', action.payload.token);
        localStorage.setItem('authUser', JSON.stringify(action.payload.user));
      }
    },
    startImpersonation: (state, action: PayloadAction<{ franchiseId: string }>) => {
      if (state.user) {
        state.impersonating = {
          originalUser: state.user,
          franchiseId: action.payload.franchiseId,
          viewOnly: true,
        };
      }
    },
    stopImpersonation: (state) => {
      if (state.impersonating) {
        state.user = state.impersonating.originalUser;
        state.impersonating = null;
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      state.impersonating = null;
      // Clear from localStorage
      if (typeof window !== 'undefined') {
        localStorage.removeItem('authToken');
        localStorage.removeItem('authUser');
      }
    },
  },
});

export const {
  setToken,
  setUser,
  setAuth,
  startImpersonation,
  stopImpersonation,
  setLoading,
  logout,
} = authSlice.actions;

export default authSlice.reducer;
