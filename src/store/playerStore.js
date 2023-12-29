import { create } from 'zustand'

export const usePlayerStore = create((set) => ({
  isPlaying: false,
  currentSong: { playlist: null, song: null, songs: [] },
  setIsPlaying: (isPlaying) => set({ isPlaying }),
  setCurrentSong: (currentSong) => set({ currentSong })
}))
