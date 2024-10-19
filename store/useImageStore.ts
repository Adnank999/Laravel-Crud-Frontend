import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import {create} from 'zustand';

interface ImageUploadState {
  image: string | StaticImport;
  setImage: (image: string | StaticImport) => void;
}

export const useImageStore = create<ImageUploadState>((set) => ({
  image: "",
  setImage: (image) => set({ image }), 
}));
