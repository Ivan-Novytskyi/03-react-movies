import { useState } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import { fetchMovies } from '../../services/movieService';
import type { Movie } from '../../types/movie';
import MovieGrid from '../MovieGrid/MovieGrid';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import MovieModal from '../MovieModal/MovieModal';
import styles from './App.module.css';
import toast from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleSearch = async (formData: FormData): Promise<void> => {
    const query = formData.get('query')?.toString() || '';
    if (!query.trim()) {
      toast.error('Please enter your search query.', {
        duration: 4000,
      });
      return;
    }
    setIsLoading(true);
    setError(null);
    setMovies([]);
    try {
      const results = await fetchMovies(query);
      setMovies(results);
      if (results.length === 0) {
        toast.error('No movies found for your request.', {
          duration: 4000,
        });
      }
    } catch {
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

  return (
    <div className={styles.app}>
      <SearchBar action={handleSearch} /> <Toaster />
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
