import {create} from 'zustand';

interface DemoGraphicState {
  countries: string[]; 
  states: string[]; 
  cities: string[];
  languages: string[]; 
  setCountries: (countries: string[]) => void;
  setStates: (states: string[]) => void;
  setCities: (cities: string[]) => void;
  setLanguages: (languages: string[]) => void;
}
export const useDemoGraphicStore = create<DemoGraphicState>((set) => ({
  countries: [],
  states: [],
  cities: [],
  languages: [],
  setCountries: (countries: string[]) => set({ countries }),
  setStates: (states: string[]) => set({ states }),
  setCities: (cities: string[]) => set({ cities }),
  setLanguages: (languages: string[]) => set({ languages }),
}));