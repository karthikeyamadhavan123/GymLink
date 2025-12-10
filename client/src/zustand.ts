// userStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { NotificationProps } from './gym-pages/gym-related-pages-users/types/types';

interface UserDetails {
  firstName: string;
  avatar: string;
  role: 'user' | 'trainer' | 'admin'
  location: string;
  phone_number: string;
  email: string;
  userId: string
  gender: "male" | "female"
}

interface UserState {
  details: UserDetails | null;
  setUserDetails: (details: UserDetails) => void;
  clearUserDetails: () => void;
}

interface NotificationState {
  notifications: NotificationProps[];
  setNotifications: (arr: NotificationProps[]) => void;
  addNotification: (n: NotificationProps) => void
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

export const useNotificationStore = create<NotificationState>()(
  persist(
    (set, get) => ({
      notifications: [],
      setNotifications: (arr: NotificationProps[]) => set({ notifications: arr }),
      addNotification: (notification: NotificationProps) =>
        set({ notifications: [...get().notifications, notification] }),
    }),
    {
      name: 'notification-storage', // name of the item in storage
      storage: createJSONStorage(() => localStorage), // use localStorage for persistence
    }
  )
);

export default useUserStore;