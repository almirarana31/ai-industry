/**
 * Consent Management Store
 * Zustand store for user consent preferences
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { consentAPI } from '@/lib/api';

export interface ConsentPreference {
  code: string;
  name: string;
  description: string;
  is_agree: boolean;
}

export interface ConsentData {
  userId: string;
  consents: ConsentPreference[];
  lastSyncedAt: string | null;
  consentVersion: string;
}

interface ConsentState {
  // State
  consentData: ConsentData | null;
  isLoading: boolean;
  error: string | null;
  isSaving: boolean;
  lastFetchedAt: Date | null;

  // Actions
  fetchConsent: () => Promise<void>;
  updateConsent: (updates: Array<{ code: string; is_agree: boolean }>) => Promise<void>;
  toggleConsent: (code: string) => void;
  syncConsent: () => Promise<void>;
  reset: () => void;
}

const initialState = {
  consentData: null,
  isLoading: false,
  error: null,
  isSaving: false,
  lastFetchedAt: null,
};

export const useConsentStore = create<ConsentState>()(
  persist(
    (set, get) => ({
      ...initialState,

      /**
       * Fetch user's consent preferences from API
       */
      fetchConsent: async () => {
        set({ isLoading: true, error: null });

        try {
          const response = await consentAPI.getConsent();

          if (response.success && response.data) {
            set({
              consentData: response.data,
              isLoading: false,
              lastFetchedAt: new Date(),
            });
          } else {
            set({
              error: response.error || 'Failed to fetch consent data',
              isLoading: false,
            });
          }
        } catch (error: any) {
          console.error('[ConsentStore] Fetch consent error:', error);
          set({
            error: error.message || 'An error occurred while fetching consent data',
            isLoading: false,
          });
        }
      },

      /**
       * Update user's consent preferences
       */
      updateConsent: async (updates: Array<{ code: string; is_agree: boolean }>) => {
        set({ isSaving: true, error: null });

        try {
          const response = await consentAPI.updateConsent(updates);

          if (response.success && response.data) {
            set({
              consentData: response.data,
              isSaving: false,
              lastFetchedAt: new Date(),
            });
          } else {
            set({
              error: response.error || 'Failed to update consent preferences',
              isSaving: false,
            });
          }
        } catch (error: any) {
          console.error('[ConsentStore] Update consent error:', error);
          set({
            error: error.message || 'An error occurred while updating consent preferences',
            isSaving: false,
          });
        }
      },

      /**
       * Toggle a single consent preference (local state only)
       * Call updateConsent() to persist changes
       */
      toggleConsent: (code: string) => {
        const { consentData } = get();
        if (!consentData) return;

        const updatedConsents = consentData.consents.map((consent) =>
          consent.code === code
            ? { ...consent, is_agree: !consent.is_agree }
            : consent
        );

        set({
          consentData: {
            ...consentData,
            consents: updatedConsents,
          },
        });
      },

      /**
       * Force sync with Privasimu service
       */
      syncConsent: async () => {
        set({ isLoading: true, error: null });

        try {
          const response = await consentAPI.syncConsent();

          if (response.success && response.data) {
            set({
              consentData: response.data,
              isLoading: false,
              lastFetchedAt: new Date(),
            });
          } else {
            set({
              error: response.error || 'Failed to sync consent data',
              isLoading: false,
            });
          }
        } catch (error: any) {
          console.error('[ConsentStore] Sync consent error:', error);
          set({
            error: error.message || 'An error occurred while syncing consent data',
            isLoading: false,
          });
        }
      },

      /**
       * Reset store to initial state
       */
      reset: () => {
        set(initialState);
      },
    }),
    {
      name: 'consent-storage',
      partialize: (state) => ({
        consentData: state.consentData,
        lastFetchedAt: state.lastFetchedAt,
      }),
    }
  )
);

// Selectors
export const selectConsents = (state: ConsentState) => state.consentData?.consents || [];
export const selectConsentByCode = (code: string) => (state: ConsentState) =>
  state.consentData?.consents.find((c) => c.code === code);
export const selectIsLoading = (state: ConsentState) => state.isLoading;
export const selectIsSaving = (state: ConsentState) => state.isSaving;
export const selectError = (state: ConsentState) => state.error;
export const selectLastSyncedAt = (state: ConsentState) => state.consentData?.lastSyncedAt;
