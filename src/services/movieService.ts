import axios from 'axios';
import type { Movie } from '../types/movie';

interface TMDBResponse {
  results: Movie[];
  page: number;
  total_pages: number;
  total_results: number;
}

const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchMovies = async (query: string): Promise<Movie[]> => {
  try {
    const response = await axios.get<TMDBResponse>(`${BASE_URL}/search/movie`, {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
      },
      params: {
        query,
        language: 'en-US',
        page: 1,
      },
    });
    console.log('API response:', response.data);
    return response.data.results || [];
  } catch (error) {
    console.error('API error:', error);
    throw error;
  }
};
