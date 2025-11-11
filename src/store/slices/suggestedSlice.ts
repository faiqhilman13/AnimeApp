import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { Anime } from '../../types';
import { jikanApi } from '../../services/jikanApi';

interface SuggestedState {
  animes: Anime[];
  loading: boolean;
  error: string | null;
}

const initialState: SuggestedState = {
  animes: [],
  loading: false,
  error: null,
};

// Fetch suggested anime (top 4 anime)
export const fetchSuggestedAnime = createAsyncThunk(
  'suggested/fetchSuggestedAnime',
  async (_, { rejectWithValue }) => {
    try {
      const response = await jikanApi.searchAnime('', 1);

      // Check if request was cancelled
      if ((response as { __cancelled?: boolean }).__cancelled) {
        return rejectWithValue('Request cancelled');
      }

      // Return only the first 4 results
      return response.data.slice(0, 4);
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Failed to fetch suggested anime'
      );
    }
  }
);

const suggestedSlice = createSlice({
  name: 'suggested',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSuggestedAnime.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSuggestedAnime.fulfilled, (state, action) => {
        state.loading = false;
        state.animes = action.payload;
        state.error = null;
      })
      .addCase(fetchSuggestedAnime.rejected, (state, action) => {
        state.loading = false;
        // Don't set error for cancelled requests
        if (action.payload !== 'Request cancelled') {
          state.error = action.payload as string;
        }
      });
  },
});

export default suggestedSlice.reducer;
