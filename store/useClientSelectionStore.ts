import { create } from "zustand";


interface ClientSelectionState {
  selectedClients: number[]; 
  selectClient: (id: number) => void;
  deselectClient: (id: number) => void;
  selectAllClients: (ids: number[]) => void;
  deselectAllClients: () => void;
}

export const useClientSelectionStore = create<ClientSelectionState>((set) => ({
  selectedClients: [],
  selectClient: (id: number) =>
    set((state) => ({
      selectedClients: [...state.selectedClients, id],
    })),
  deselectClient: (id: number) =>
    set((state) => ({
      selectedClients: state.selectedClients.filter((clientId) => clientId !== id),
    })),
  selectAllClients: (ids: number[]) =>
    set({
      selectedClients: ids,
    }),
  deselectAllClients: () => set({ selectedClients: [] }),
}));
