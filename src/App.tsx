import React, { useEffect } from "react";
import "./App.css";
import {
  fetchGenres,
  fetchNowPlayngMovies,
  fetchPopularMovies,
  fetchTopRatedMovies,
  fetchTrendingMovies,
  fetchUpcomingMovies,
} from "./store/slice/movies";
import { useAppDispatch } from "./hooks/useAppDispatch";
import Header from "./components/Header";
import AppRouter from "./approutes/AppRouter";
import Footer from "./components/Footer";

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchPopularMovies());
    dispatch(fetchGenres());
    dispatch(fetchTrendingMovies());
    dispatch(fetchPopularMovies());
    dispatch(fetchNowPlayngMovies());
    dispatch(fetchUpcomingMovies());
  }, [dispatch]);

  return (
    <div className="App">
      <div className="content">
      <Header />
      <AppRouter />
      </div>
      <div className="footer">
      <Footer/>
      </div>
    </div>
  );
}

export default App;
