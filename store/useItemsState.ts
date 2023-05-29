import { create } from "zustand";

type ItemsStoreState = {
  items: [];
  setItems: (newItems: any) => void;
  allTotal: number;
  setAllTotal: (total: any) => any;
};

export const useItemsStore = create<ItemsStoreState>((set) => ({
  items: [],
  setItems: (newItems: any) => set(() => ({ items: newItems })),
  allTotal: 0,
  setAllTotal: (total: any) => set(() => ({ allTotal: total })),
}));
