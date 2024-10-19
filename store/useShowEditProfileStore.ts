import { create } from 'zustand';


interface showEditProfileType {
  showEditProfile: boolean;
  setShowEditProfile: (value: boolean) => void;
}

export const useShowEditProfileStore = create<showEditProfileType>((set) => ({
    showEditProfile: false, 
    setShowEditProfile: (value) => set({ showEditProfile: value }),
}));
