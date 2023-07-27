import { useEffect } from "react";
import Banner from "../../components/Banner";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import {
  fetchPopularMovies,
  fetchTopRatedMovies,
} from "../../store/slice/movies";
import styles from "../../styles/Main/Main.module.scss";
import TopRated from "../../components/TopRated";

const Main: React.FC = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchPopularMovies());
  }, [dispatch]);

  return (
    <main className={styles.wrapper}>
        <Banner />
      <div className={styles.center}>
        <TopRated />
      </div>
    </main>
  );
};
export default Main;
