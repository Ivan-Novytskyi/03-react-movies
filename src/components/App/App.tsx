import { useState, useEffect } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import { fetchMovies } from '../../services/movieService';
import type { Movie } from '../../types/movie';
import MovieGrid from '../MovieGrid/MovieGrid';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import MovieModal from '../MovieModal/MovieModal';
import styles from './App.module.css';
import toast from 'react-hot-toast';

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleSearch = async (query: string) => {
    setIsLoading(true);
    setError(null);
    setMovies([]);
    console.log('Search query:', query);
    try {
      const results = await fetchMovies(query);
      console.log('Fetch results:', results);
      setMovies(results);
      if (results.length === 0) {
        toast.error('No movies found for your request.', {
          duration: 4000,
        });
      }
    } catch (err) {
      console.error('Fetch error:', err);
      setError(
        'Failed to fetch movies. Please check your connection or try again later.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectMovie = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
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
        <MovieGrid movies={movies} onSelect={handleSelectMovie} />
      )}
      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
      )}
    </div>
  );
}

export default App;
