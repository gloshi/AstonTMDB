
import Banner from "../../components/Banner";
import styles from "../../styles/Main/Main.module.scss";
import TopRated from "../../components/TopRated";
import Upcoming from "../../components/Upcoming";
import NowPlaying from "../../components/NowPlaying";
import Load from "../Load";
import { useAppSelector } from "../../hooks/useAppSelector";
import GridFilms from "../../components/GridFilms";
import { fetchNowPlayngMovies, fetchTopRatedMovies, fetchUpcomingMovies } from "../../store/slice/movies";

const Main: React.FC = () => {

  const { topRated, upcoming, nowPlaying, isLoading } = useAppSelector((state) => state.movies);

  console.log(topRated)

  return (
    <main className={styles.wrapper}>
        <Banner />
      <div className={styles.center}>
        <GridFilms isLoading={isLoading} category={topRated.results} fetchMovies={fetchTopRatedMovies} text={'Top Rated'} />
        <GridFilms isLoading={isLoading} category={upcoming.results} fetchMovies={fetchUpcomingMovies} text={'Upcoming'} />
        <GridFilms isLoading={isLoading} category={nowPlaying.results} fetchMovies={fetchNowPlayngMovies} text={'Now playing'} />
      </div>
    </main>
  );
};
export default Main;
