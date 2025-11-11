import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { Anime } from '../../types';
import { jikanApi } from '../../services/jikanApi';

interface AnimeDetailState {
  anime: Anime | null;
  loading: boolean;
  error: string | null;
}

const initialState: AnimeDetailState = {
  anime: null,
  loading: false,
  error: null,
};

// Async thunk
export const fetchAnimeDetail = createAsyncThunk(
  'animeDetail/fetchAnimeDetail',
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await jikanApi.getAnimeById(id);
      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('An unexpected error occurred');
    }
  }
);

const animeDetailSlice = createSlice({
  name: 'animeDetail',
  initialState,
  reducers: {
    clearAnimeDetail: (state) => {
      state.anime = null;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnimeDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAnimeDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.anime = action.payload;
      })
      .addCase(fetchAnimeDetail.rejected, (state, action) => {
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
      });
  },
});

export const { clearAnimeDetail, clearError } = animeDetailSlice.actions;
export default animeDetailSlice.reducer;
