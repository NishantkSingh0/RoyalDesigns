import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      role: null,

      setAuth: ({ user, access, role }) =>
        set({ user, accessToken: access, role }),

      setAccessToken: (token) => set({ accessToken: token }),

      updateUser: (updates) =>
        set((state) => ({ user: { ...state.user, ...updates } })),

      logout: () => set({ user: null, accessToken: null, role: null }),
    }),
    {
      name: "fmp-auth",
      partialState: (state) => ({ user: state.user, role: state.role }),
      // Do NOT persist the access token — refresh via httpOnly cookie
    }
  )
);
