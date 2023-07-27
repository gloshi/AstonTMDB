import React, { useEffect } from 'react';
import './App.css';
import { fetchGenres, fetchNowPlayngMovies, fetchPopularMovies, fetchTopRatedMovies, fetchTrendingMovies, fetchUpcomingMovies } from './store/slice/movies';
import { useAppDispatch } from './hooks/useAppDispatch';
import Header from './components/Header';
import AppRouter from './approutes/AppRouter';

function App() {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchPopularMovies())
    dispatch(fetchGenres());
    dispatch(fetchTrendingMovies());
    dispatch(fetchPopularMovies());
    dispatch(fetchNowPlayngMovies());
    dispatch(fetchUpcomingMovies());
    
  }, [dispatch])

  useEffect(() => {
    const page = 1;
    dispatch(fetchTopRatedMovies(page));
  }, []);

  return (
    <div className="App">
      <Header/>
      <AppRouter />
    </div>
  );
}

export default App;
