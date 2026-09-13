import { create } from "zustand";

export const useFavoritesStore = create((set, get) => ({
  favorites: [],

  addFavorite: (jobId) => {
    set((state) => ({
      favorites: state.favorites.includes(jobId)
        ? state.favorites
        : [...state.favorites, jobId],
    }));
  },

  removeFavorite: (jobId) => {
    set((state) => ({
      favorites: state.favorites.filter((id) => id !== jobId),
    }));
  },

  isFavorite: (jobId) => {
    const { favorites } = get();
    return favorites.includes(jobId);
  },

  toggleFavorite: (jobId) => {
    const { isFavorite, addFavorite, removeFavorite } = get();
    isFavorite(jobId) ? removeFavorite(jobId) : addFavorite(jobId);
  },

  listFavorites: () => get().favorites.length,
}));
