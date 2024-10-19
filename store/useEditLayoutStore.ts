import {create} from 'zustand';

interface EditProfileActiveState {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export const useEditLayoutStore = create<EditProfileActiveState>((set) => ({
  activeSection: 'aboutClient',
  setActiveSection: (section: string) => set({ activeSection: section }),
}));
