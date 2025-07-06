import 'modern-normalize/modern-normalize.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/App/App.tsx';
import { fetchMovies } from './services/movieService';
import { Toaster } from 'react-hot-toast';
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
    <Toaster /> {}
  </StrictMode>
);
