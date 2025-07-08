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
  if (!import.meta.env.VITE_TMDB_TOKEN) {
    throw new Error('TMDB token is not configured in .env');
  }

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

  return response.data.results || [];
};
