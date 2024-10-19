import {create} from 'zustand';

interface ClientAddressIdStore {
  selectedCountryId: number | null;
  selectedStateId: number | null;
  selectedCityId: number | null;
  setSelectedCountryId: (id: number | null) => void;
  setSelectedStateId: (id: number | null) => void;
  setSelectedCityId: (id: number | null) => void;
}

export const useClientAddressIdStore = create<ClientAddressIdStore>((set) => ({
  selectedCountryId: null,
  selectedStateId: null,
  selectedCityId: null,

  setSelectedCountryId: (id) => set({ selectedCountryId: id }),
  setSelectedStateId: (id) => set({ selectedStateId: id }),
  setSelectedCityId: (id) => set({ selectedCityId: id }),
}));
