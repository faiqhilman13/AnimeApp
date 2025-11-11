import axios, { type AxiosInstance, type CancelTokenSource } from 'axios';
import type { AnimeSearchResponse, AnimeDetailResponse } from '../types';

const BASE_URL = 'https://api.jikan.moe/v4';

class JikanAPI {
  private api: AxiosInstance;
  private cancelTokens: Map<string, CancelTokenSource>;

  constructor() {
    this.api = axios.create({
      baseURL: BASE_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.cancelTokens = new Map();
  }

  /**
   * Cancel any pending request for a given key
   */
  private cancelPendingRequest(key: string): void {
    const cancelToken = this.cancelTokens.get(key);
    if (cancelToken) {
      cancelToken.cancel('Request cancelled due to new request');
      this.cancelTokens.delete(key);
    }
  }

  /**
   * Create a new cancel token for a request
   */
  private createCancelToken(key: string): CancelTokenSource {
    this.cancelPendingRequest(key);
    const cancelToken = axios.CancelToken.source();
    this.cancelTokens.set(key, cancelToken);
    return cancelToken;
  }

  /**
   * Search for anime with pagination
   * @param query - Search query string
   * @param page - Page number (default: 1)
   * @param limit - Results per page (default: 25)
   */
  async searchAnime(
    query: string,
    page: number = 1,
    limit: number = 25
  ): Promise<AnimeSearchResponse> {
    const requestKey = 'search-anime';
    const cancelToken = this.createCancelToken(requestKey);

    try {
      const response = await this.api.get<AnimeSearchResponse>('/anime', {
        params: {
          q: query,
          page,
          limit,
          sfw: true, // Safe for work filter
        },
        cancelToken: cancelToken.token,
      });

      this.cancelTokens.delete(requestKey);
      return response.data;
    } catch (error) {
      if (axios.isCancel(error)) {
        // Return a rejected promise without throwing to avoid error handling
        return Promise.reject({ __cancelled: true });
      }
      throw this.handleError(error);
    }
  }

  /**
   * Get detailed information about a specific anime
   * @param id - MyAnimeList ID of the anime
   */
  async getAnimeById(id: number): Promise<AnimeDetailResponse> {
    const requestKey = `anime-${id}`;
    const cancelToken = this.createCancelToken(requestKey);

    try {
      const response = await this.api.get<AnimeDetailResponse>(
        `/anime/${id}`,
        {
          cancelToken: cancelToken.token,
        }
      );

      this.cancelTokens.delete(requestKey);
      return response.data;
    } catch (error) {
      if (axios.isCancel(error)) {
        // Return a rejected promise without throwing to avoid error handling
        return Promise.reject({ __cancelled: true });
      }
      throw this.handleError(error);
    }
  }

  /**
   * Get top anime with pagination
   * @param page - Page number (default: 1)
   * @param limit - Results per page (default: 25)
   */
  async getTopAnime(
    page: number = 1,
    limit: number = 25
  ): Promise<AnimeSearchResponse> {
    const requestKey = 'top-anime';
    const cancelToken = this.createCancelToken(requestKey);

    try {
      const response = await this.api.get<AnimeSearchResponse>('/top/anime', {
        params: {
          page,
          limit,
        },
        cancelToken: cancelToken.token,
      });

      this.cancelTokens.delete(requestKey);
      return response.data;
    } catch (error) {
      if (axios.isCancel(error)) {
        // Return a rejected promise without throwing to avoid error handling
        return Promise.reject({ __cancelled: true });
      }
      throw this.handleError(error);
    }
  }

  /**
   * Cancel all pending requests
   */
  cancelAllRequests(): void {
    this.cancelTokens.forEach((cancelToken) => {
      cancelToken.cancel('All requests cancelled');
    });
    this.cancelTokens.clear();
  }

  /**
   * Handle API errors with meaningful messages
   */
  private handleError(error: unknown): Error {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        // Server responded with error status
        const status = error.response.status;
        switch (status) {
          case 404:
            return new Error('Anime not found');
          case 429:
            return new Error('Too many requests. Please try again later.');
          case 500:
          case 502:
          case 503:
            return new Error('Server error. Please try again later.');
          default:
            return new Error(`API error: ${error.response.statusText}`);
        }
      } else if (error.request) {
        // Request made but no response
        return new Error('Network error. Please check your connection.');
      }
    }
    return new Error('An unexpected error occurred');
  }
}

// Export singleton instance
export const jikanApi = new JikanAPI();
