import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Anime } from '../../types';
import { getFavorites, toggleFavorite as toggleFavoriteUtil } from '../../utils/favorites';

interface FavoritesState {
  favorites: Anime[];
}

const initialState: FavoritesState = {
  favorites: getFavorites(),
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<Anime>) => {
      const result = toggleFavoriteUtil(action.payload);
      state.favorites = result.favorites;
    },
    loadFavorites: (state) => {
      state.favorites = getFavorites();
    },
  },
});

export const { toggleFavorite, loadFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
