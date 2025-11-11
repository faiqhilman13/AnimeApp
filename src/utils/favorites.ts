import type { Anime } from '../types';

const FAVORITES_KEY = 'anime-vault-favorites';

export const getFavorites = (): Anime[] => {
  try {
    const stored = localStorage.getItem(FAVORITES_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error reading favorites:', error);
    return [];
  }
};

export const saveFavorites = (favorites: Anime[]): void => {
  try {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  } catch (error) {
    console.error('Error saving favorites:', error);
  }
};

export const addFavorite = (anime: Anime): Anime[] => {
  const favorites = getFavorites();
  if (!favorites.some((fav) => fav.mal_id === anime.mal_id)) {
    const updated = [...favorites, anime];
    saveFavorites(updated);
    return updated;
  }
  return favorites;
};

export const removeFavorite = (animeId: number): Anime[] => {
  const favorites = getFavorites();
  const updated = favorites.filter((fav) => fav.mal_id !== animeId);
  saveFavorites(updated);
  return updated;
};

export const isFavorite = (animeId: number): boolean => {
  const favorites = getFavorites();
  return favorites.some((fav) => fav.mal_id === animeId);
};

export const toggleFavorite = (anime: Anime): { isFavorite: boolean; favorites: Anime[] } => {
  if (isFavorite(anime.mal_id)) {
    return { isFavorite: false, favorites: removeFavorite(anime.mal_id) };
  } else {
    return { isFavorite: true, favorites: addFavorite(anime) };
  }
};
