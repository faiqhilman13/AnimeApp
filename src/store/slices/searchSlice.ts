import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import type { Anime, PaginationInfo } from '../../types';
import { jikanApi } from '../../services/jikanApi';

export type SortOption = 'score' | 'popularity' | 'title' | 'start_date' | '';
export type ViewMode = 'grid' | 'list';

interface SearchState {
  query: string;
  results: Anime[];
  pagination: PaginationInfo | null;
  loading: boolean;
  error: string | null;
  currentPage: number;
  sortBy: SortOption;
  viewMode: ViewMode;
  genreFilter: string | null;
}

const initialState: SearchState = {
  query: '',
  results: [],
  pagination: null,
  loading: false,
  error: null,
  currentPage: 1,
  sortBy: '',
  viewMode: 'grid',
  genreFilter: null,
};

// Async thunks
export const searchAnime = createAsyncThunk(
  'search/searchAnime',
  async (
    { query, page = 1 }: { query: string; page?: number },
    { rejectWithValue }
  ) => {
    try {
      if (!query.trim()) {
        // If query is empty, fetch top anime instead
        const response = await jikanApi.getTopAnime(page);
        return response;
      }
      const response = await jikanApi.searchAnime(query, page);
      return response;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('An unexpected error occurred');
    }
  }
);

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    clearSearch: (state) => {
      state.query = '';
      state.results = [];
      state.pagination = null;
      state.error = null;
      state.currentPage = 1;
    },
    clearError: (state) => {
      state.error = null;
    },
    setSortBy: (state, action: PayloadAction<SortOption>) => {
      state.sortBy = action.payload;
      // Sort the current results
      if (action.payload && state.results.length > 0) {
        state.results = [...state.results].sort((a, b) => {
          switch (action.payload) {
            case 'score':
              return (b.score || 0) - (a.score || 0);
            case 'popularity':
              return (a.popularity || 999999) - (b.popularity || 999999);
            case 'title':
              return a.title.localeCompare(b.title);
            case 'start_date':
              return (b.year || 0) - (a.year || 0);
            default:
              return 0;
          }
        });
      }
    },
    setViewMode: (state, action: PayloadAction<ViewMode>) => {
      state.viewMode = action.payload;
    },
    setGenreFilter: (state, action: PayloadAction<string | null>) => {
      state.genreFilter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchAnime.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchAnime.fulfilled, (state, action) => {
        state.loading = false;
        state.results = action.payload.data;
        state.pagination = action.payload.pagination;
      })
      .addCase(searchAnime.rejected, (state, action) => {
        state.loading = false;
        // Check if this is a cancelled request
        if (action.payload && typeof action.payload === 'object' && '__cancelled' in action.payload) {
          // Silently ignore cancelled requests
          return;
        }
        const error = action.payload as string;
        // Don't set error for cancelled requests
        if (error && !error.toLowerCase().includes('cancel')) {
          state.error = error;
        }
        // Don't clear results on error, show previous results with error message
      });
  },
});

export const { setQuery, setCurrentPage, clearSearch, clearError, setSortBy, setViewMode, setGenreFilter } =
  searchSlice.actions;
export default searchSlice.reducer;
