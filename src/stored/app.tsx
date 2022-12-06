import create from "zustand";

interface SoundStore {
  isSound: boolean;
  setSound: () => void;
}

const useStore = create<SoundStore>((set) => ({
  isSound: false,
  setSound: () => set((state) => ({ isSound: !state.isSound })),
}));

export default useStore;
