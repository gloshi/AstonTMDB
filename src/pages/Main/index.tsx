import Banner from "../../components/Banner";
import styles from "../../styles/Main/Main.module.scss";
import { useAppSelector } from "../../hooks/useAppSelector";
import GridFilms from "../../components/GridFilms";
import { AppRoutes } from "../../approutes/RoutesConfig";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useEffect } from "react";
import {
  fetchActors,
  fetchNowPlayngMovies,
  fetchPopularMovies,
  fetchTopRatedMovies,
  fetchUpcomingMovies,
} from "../../store/slice/movies";

const Main: React.FC = () => {
  const { topRated, upcoming, nowPlaying, isLoading } = useAppSelector(
    (state) => state.movies
  );

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchPopularMovies());
    dispatch(fetchTopRatedMovies(1));
    dispatch(fetchNowPlayngMovies(1));
    dispatch(fetchUpcomingMovies(1));
  }, [dispatch]);

  return (
    <main className={styles.wrapper}>
      {/* <Banner /> */}
      <div className={styles.center}>
        <GridFilms
          isLoading={isLoading}
          category={topRated.results}
          route={AppRoutes.TOP_RATED}
          text={"Top Rated"}
        />
        <GridFilms
          isLoading={isLoading}
          category={upcoming.results}
          route={AppRoutes.UPCOMING}
          text={"Upcoming"}
        />
        <GridFilms
          isLoading={isLoading}
          category={nowPlaying.results}
          route={AppRoutes.NOWPLAYNG}
          text={"Now playing"}
        />
      </div>
    </main>
  );
};
export default Main;
