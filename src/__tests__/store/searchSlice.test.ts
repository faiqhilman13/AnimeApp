import { describe, it, expect, beforeEach } from 'vitest';
import { configureStore, type EnhancedStore } from '@reduxjs/toolkit';
import searchReducer, {
  setQuery,
  setCurrentPage,
  clearSearch,
} from '../../store/slices/searchSlice';

type StoreType = EnhancedStore<{
  search: ReturnType<typeof searchReducer>;
}>;

describe('searchSlice', () => {
  let store: StoreType;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        search: searchReducer,
      },
    });
  });

  it('should have initial state', () => {
    const state = store.getState().search;
    expect(state.query).toBe('');
    expect(state.results).toEqual([]);
    expect(state.pagination).toBeNull();
    expect(state.loading).toBe(false);
    expect(state.error).toBeNull();
    expect(state.currentPage).toBe(1);
  });

  it('should handle setQuery', () => {
    store.dispatch(setQuery('naruto'));
    const state = store.getState().search;
    expect(state.query).toBe('naruto');
  });

  it('should handle setCurrentPage', () => {
    store.dispatch(setCurrentPage(5));
    const state = store.getState().search;
    expect(state.currentPage).toBe(5);
  });

  it('should handle clearSearch', () => {
    // Set some state
    store.dispatch(setQuery('test'));
    store.dispatch(setCurrentPage(3));

    // Clear
    store.dispatch(clearSearch());

    const state = store.getState().search;
    expect(state.query).toBe('');
    expect(state.results).toEqual([]);
    expect(state.pagination).toBeNull();
    expect(state.error).toBeNull();
    expect(state.currentPage).toBe(1);
  });
});
