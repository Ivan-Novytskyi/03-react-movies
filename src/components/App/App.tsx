import { useState, useEffect } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import { fetchMovies } from '../../services/movieService';
import type { Movie } from '../../types/movie';
import MovieGrid from '../MovieGrid/MovieGrid';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import styles from './App.module.css';
import toast from 'react-hot-toast';

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (query: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const results = await fetchMovies(query);
      setMovies(results);
      if (results.length === 0) {
        toast.error('No movies found for your request.');
      }
    } catch {
      setError('Failed to fetch movies.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setMovies([]);
  }, []);

  return (
    <div className={styles.app}>
      <h1>Movie Search</h1>
      <SearchBar onSubmit={handleSearch} />
      {isLoading ? (
        <Loader />
      ) : error ? (
        <ErrorMessage />
      ) : (
        <MovieGrid movies={movies} onSelect={(movie) => console.log(movie)} />
      )}
    </div>
  );
}

export default App;
