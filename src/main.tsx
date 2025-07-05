import 'modern-normalize/modern-normalize.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './components/App/App.tsx';
import { fetchMovies } from './services/movieService';

(async () => {
  try {
    const movies = await fetchMovies('action');
    console.log('Movies:', movies);
  } catch (error) {
    console.error('Fetch error:', error);
  }
})();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
