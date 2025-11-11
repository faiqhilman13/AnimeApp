import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useDebounce } from '../../hooks/useDebounce';

describe('useDebounce', () => {
  it('should return initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('test', 250));
    expect(result.current).toBe('test');
  });

  it('should debounce value changes', async () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: 'initial', delay: 250 },
      }
    );

    expect(result.current).toBe('initial');

    // Change value
    rerender({ value: 'changed', delay: 250 });

    // Value should still be initial immediately
    expect(result.current).toBe('initial');

    // Wait for debounce
    await waitFor(
      () => {
        expect(result.current).toBe('changed');
      },
      { timeout: 300 }
    );
  });

  it('should cancel pending debounce on rapid changes', async () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 250),
      {
        initialProps: { value: 'initial' },
      }
    );

    // Rapid changes
    rerender({ value: 'change1' });
    await new Promise((resolve) => setTimeout(resolve, 100));
    rerender({ value: 'change2' });
    await new Promise((resolve) => setTimeout(resolve, 100));
    rerender({ value: 'final' });

    // Wait for debounce
    await waitFor(
      () => {
        expect(result.current).toBe('final');
      },
      { timeout: 400 }
    );
  });
});
