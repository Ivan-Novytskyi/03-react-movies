import { useState, useEffect } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import { fetchMovies } from '../../services/movieService';
import type { Movie } from '../../types/movie';
import MovieGrid from '../MovieGrid/MovieGrid';
import Loader from '../Loader/Loader';
import styles from './App.module.css';
import toast from 'react-hot-toast';

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (query: string) => {
    setIsLoading(true); // Увімкнення Loader
    try {
      const results = await fetchMovies(query);
      setMovies(results);
      if (results.length === 0) {
        toast.error('No movies found for your request.');
      }
    } catch {
      toast.error('There was an error, please try again...');
    } finally {
      setIsLoading(false); // Вимкнення Loader
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
      ) : (
        <MovieGrid movies={movies} onSelect={(movie) => console.log(movie)} />
      )}
    </div>
  );
}

export default App;
