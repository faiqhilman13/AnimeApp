import { configureStore } from '@reduxjs/toolkit';
import searchReducer from './slices/searchSlice';
import animeDetailReducer from './slices/animeDetailSlice';
import favoritesReducer from './slices/favoritesSlice';
import suggestedReducer from './slices/suggestedSlice';

export const store = configureStore({
  reducer: {
    search: searchReducer,
    animeDetail: animeDetailReducer,
    favorites: favoritesReducer,
    suggested: suggestedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types if needed
        ignoredActions: [],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
