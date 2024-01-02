import { create } from 'zustand'

export const usePlayerStore = create((set) => ({
	isPlaying: false,
	setIsPlaying: (isPlaying) => set({ isPlaying }),
	currentSong: { playlist: null, song: null, songs: [] },
	setCurrentSong: (currentSong) => set({ currentSong }),
	volume: 1,
	setVolume: (volume) => set({ volume })
}))
