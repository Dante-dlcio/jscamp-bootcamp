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
    /*
    isFavorite(jobId) ? removeFavorite(jobId) : addFavorite(jobId);
    */
    // La ternaria está perfecto! Lo dejamos con `if/else` a ver si te queda más legible. Siempre prefiero ternarias a nivel personal, pero hay casos en los que al leer el código, me confunde más. Te lo dejo a tu criterio :)
    if (isFavorite(jobId)) {
      removeFavorite(jobId);
    } else {
      addFavorite(jobId);
    }
  },

  listFavorites: () => get().favorites.length,
}));
