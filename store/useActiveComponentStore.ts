import { create } from 'zustand';


interface ActiveComponentState {
  activeComponent: string;
  setActiveComponent: (component: string) => void;
}

export const useActiveComponentStore = create<ActiveComponentState>((set) => ({
  activeComponent: 'Dashboard', 
  setActiveComponent: (component) => set({ activeComponent: component }),
}));
