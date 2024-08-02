import { create } from 'zustand'
// Persistencia de los componentes no es lo mismo que comunicación de componentes
// currentMusic recibe el albun que estamos escuchando (para extraer la info como cantidad de cancioines etc), la cancion actual + la coleccion de canciones que puede ejecutar

export const usePlayerStore = create((set) => ({
  isPlaying: false,
  setIsPlaying: (isPlaying) => set({ isPlaying }),
  currentMusic: { playLists: null, song: null, songs: [] },
  setCurrentMusic: (currentMusic) => set({ currentMusic }),
  volume: 0.3,
  setVolume: (volume) => set({ volume })
}))
