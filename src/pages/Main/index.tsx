import Banner from "../../components/Banner";
import styles from "../../styles/Main/Main.module.scss";
import { useAppSelector } from "../../hooks/useAppSelector";
import GridFilms from "../../components/GridFilms";
import { AppRoutes } from "../../approutes/RoutesConfig";

const Main: React.FC = () => {
  const { topRated, upcoming, nowPlaying, isLoading } = useAppSelector(
    (state) => state.movies
  );

  return (
    <main className={styles.wrapper}>
      <Banner />
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
