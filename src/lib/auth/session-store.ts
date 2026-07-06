"use client";

import { create } from "zustand";

export type ActiveRole = "siswa" | "orang-tua" | "guru" | "dudi" | "admin";

type SessionState = {
  activeRole: ActiveRole | null;
  isAuthenticated: boolean;
  setActiveRole: (role: ActiveRole | null) => void;
  setAuthenticated: (value: boolean) => void;
  resetSession: () => void;
};

export const useSessionStore = create<SessionState>((set) => ({
  activeRole: null,
  isAuthenticated: false,
  setActiveRole: (role) => set({ activeRole: role }),
  setAuthenticated: (value) => set({ isAuthenticated: value }),
  resetSession: () => set({ activeRole: null, isAuthenticated: false }),
}));
