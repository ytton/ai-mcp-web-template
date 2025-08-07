import { create } from 'zustand';

interface User {
  id: number;
  name: string;
  email: string;
  avatar?: string;
}

interface AppState {
  count: number;
  user: User | null;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
  setUser: (user: User | null) => void;
}

export const useAppStore = create<AppState>((set) => ({
  count: 0,
  user: null,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 }),
  setUser: (user: User | null) => set({ user }),
}));
