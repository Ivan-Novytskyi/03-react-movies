import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchMovies = async (query: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/search/movie`, {
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
