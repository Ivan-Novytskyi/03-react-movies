import type { Movie } from '../../types/movie';
import styles from './MovieModal.module.css';

interface MovieModalProps {
  movie: Movie;
  onClose: () => void;
}

const MovieModal = ({ movie, onClose }: MovieModalProps) => {
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          ×
        </button>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path || ''}`}
          alt={movie.title}
          className={styles.image}
        />
        <h2 className={styles.title}>{movie.title}</h2>
        <p className={styles.overview}>{movie.overview}</p>
        <p className={styles.details}>
          Release Date: {movie.release_date} | Rating: {movie.vote_average}
        </p>
      </div>
    </div>
  );
};

export default MovieModal;
