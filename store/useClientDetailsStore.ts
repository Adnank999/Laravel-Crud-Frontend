import { Client } from '@/model/Client';
import { create } from 'zustand';

interface ClientStore {
  selectedClientId: number | null;
  clientDetailsResult: Client | null;
  setSelectedClientId: (id: number | null) => void;
  setClientDetailsResult: (client: Client) => void;
}

export const useClientDetailsStore = create<ClientStore>((set) => ({
  selectedClientId: null,
  clientDetailsResult: null,
  setSelectedClientId: (id) => set({ selectedClientId: id }),
  setClientDetailsResult: (client) => set({ clientDetailsResult: client }),
}));
