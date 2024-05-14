import create from 'zustand';

import { AuthUser } from '@/types';

type UserState = {
  user: AuthUser | null;
  setUser: (user: AuthUser) => void;
};

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set(() => ({ user })),
}));
