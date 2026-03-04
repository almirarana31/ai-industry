import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, AuthState } from '@/types';
import { mockUser } from '@/lib/mock-data';

// DEMO MODE - set to true to bypass backend
const DEMO_MODE = true;

interface AuthStore extends AuthState {
  setUser: (user: User | null) => void;
  setTokens: (accessToken: string | null, refreshToken: string | null) => void;
  login: (user: User, accessToken: string, refreshToken: string) => void;
  logout: () => void;
  setLoading: (isLoading: boolean) => void;
  initialize: () => Promise<void>;
  demoLogin: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      isLoading: true,

      setUser: (user) =>
        set({
          user,
          isAuthenticated: !!user,
        }),

      setTokens: (accessToken, refreshToken) =>
        set({
          accessToken,
          refreshToken,
        }),

      login: (user, accessToken, refreshToken) =>
        set({
          user,
          accessToken,
          refreshToken,
          isAuthenticated: true,
          isLoading: false,
        }),

      logout: () =>
        set({
          user: null,
          accessToken: null,
          refreshToken: null,
          isAuthenticated: false,
          isLoading: false,
        }),

      setLoading: (isLoading) => set({ isLoading }),

      demoLogin: () =>
        set({
          user: mockUser,
          accessToken: 'demo-token',
          refreshToken: 'demo-refresh-token',
          isAuthenticated: true,
          isLoading: false,
        }),

      initialize: async () => {
        // In demo mode, auto-login with mock user if not authenticated
        if (DEMO_MODE) {
          const { isAuthenticated } = get();
          if (!isAuthenticated) {
            // Small delay to simulate loading
            await new Promise(resolve => setTimeout(resolve, 300));
          }
          set({
            user: mockUser,
            accessToken: 'demo-token',
            refreshToken: 'demo-refresh-token',
            isAuthenticated: true,
            isLoading: false,
          });
          return;
        }

        // Production mode - use real API
        const { accessToken } = get();
        if (!accessToken) {
          set({ isLoading: false, isAuthenticated: false });
          return;
        }

        try {
          const API_BASE = process.env.NEXT_PUBLIC_API_URL || '/api';
          const response = await fetch(`${API_BASE}/auth/me`, {
            headers: {
              'Authorization': `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
            },
          });

          if (response.ok) {
            const data = await response.json();
            if (data.success && data.data) {
              set({
                user: data.data,
                isAuthenticated: true,
                isLoading: false,
              });
              return;
            }
          }
        } catch (error) {
          console.error('Failed to initialize auth:', error);
        }

        // Token invalid or expired
        set({
          user: null,
          accessToken: null,
          refreshToken: null,
          isAuthenticated: false,
          isLoading: false,
        });
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
      }),
      onRehydrate: () => {
        return (state) => {
          // After rehydrating from storage, initialize auth
          state?.initialize();
        };
      },
    }
  )
);
