import { useState, useEffect } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import { fetchMovies } from '../../services/movieService';
import type { Movie } from '../../types/movie';
import MovieGrid from '../MovieGrid/MovieGrid';
import styles from './App.module.css';
import toast from 'react-hot-toast';

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);

  const handleSearch = async (query: string) => {
    try {
      const results = await fetchMovies(query);
      setMovies(results);
      if (results.length === 0) {
        toast.error('No movies found for your request.');
      }
    } catch {
      toast.error('There was an error, please try again...');
    }
  };

  useEffect(() => {
    setMovies([]);
  }, []);

  return (
    <div className={styles.app}>
      <h1>Movie Search</h1>
      <SearchBar onSubmit={handleSearch} />
      <MovieGrid movies={movies} onSelect={(movie) => console.log(movie)} />
    </div>
  );
}

export default App;
