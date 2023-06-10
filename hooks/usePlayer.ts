import { Song } from "@/types";
import { create } from "zustand";

interface PlayerStore {
    playList: Song[];
    activeSong?: Song | null;
    setActiveSong: (song: Song )=> void;
    setPlayList: (songs: Song[]) => void;
    reset: () => void;
}

const usePlayer = create<PlayerStore>((set) => ({
    playList: [],
    activeSong: undefined,
    setActiveSong: (song: Song) => set({activeSong: song}),
    setPlayList: (songs: Song[]) => set({playList: songs}),
    reset: () => set({playList: [], activeSong: null})
}))

export default usePlayer