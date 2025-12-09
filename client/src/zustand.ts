// userStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface UserDetails {
  firstName: string;
  avatar: string;
  role: 'user' | 'admin';
  location: string;
  phone_number: string;
  email: string;
  userId:string
  gender:"male" | "female"
}

interface UserState {
  details: UserDetails | null;
  setUserDetails: (details: UserDetails) => void;
  clearUserDetails: () => void;
}

const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      details: null,
      setUserDetails: (details: UserDetails) => set({ details }),
      clearUserDetails: () => set({ details: null }),
    }),
    {
      name: 'user-storage', // name of the item in storage
      storage: createJSONStorage(() => localStorage), // use localStorage for persistence
    }
  )
);

export default useUserStore;