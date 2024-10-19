import {create} from 'zustand';

interface ShowSharedPdfStore {
  sharedFiles: string[]; 
  setSharedFiles: (files: string[]) => void; 
}

export const useShowSharedPdfStore = create<ShowSharedPdfStore>((set) => ({
  sharedFiles: [],
  setSharedFiles: (files: string[]) => set({ sharedFiles: files }),
}));
