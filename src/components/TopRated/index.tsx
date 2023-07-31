import styles from "../../styles/GridFilms/GridFilms.module.scss";
import { GrFavorite } from "react-icons/gr";
import { useAppSelector } from "../../hooks/useAppSelector";
import Load from "../../pages/Load";
import { useEffect, useState } from "react";
import { fetchTopRatedMovies } from "../../store/slice/movies";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { BiStar } from "react-icons/bi";
import { Link } from "react-router-dom";
import { AppRoutes } from "../../approutes/RoutesConfig";

const TopRated: React.FC = () => {
  const { topRated, isLoading } = useAppSelector((state) => state.movies);
  const [page, setPage] = useState<number>(1);
  
  const pagesArr = [1, 2, 3, 4, 5, 6, 7, 8];
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchTopRatedMovies(page));
  }, [page]);

  if (isLoading) {
    return <Load />;
  }

  return (
    <section className={styles.wrapper}>
      <h3 className={styles.text}>Top rated movies</h3>
      <div className={styles.grid}>
        {topRated.results.map((el, i) => (
          <div key={el.id} className={styles.card}>
            <Link to={AppRoutes.SINGLE_MOVIE + `/${el.id}`}>
              <img
                className={styles.poster}
                src={`https://image.tmdb.org/t/p/original/${el.poster_path}`}
                alt={el.title}
              />
              <span
                style={
                  el.title?.length < 28
                    ? { fontSize: "20px" }
                    : { fontSize: "14px" }
                }
                className={styles.title}
              >
                {el.title}
              </span>
            </Link>
            <div className={styles.params}>
              <span className={styles.year}>{el.release_date.slice(0, 4)}</span>
              <GrFavorite />
            </div>
            <div className={styles.rating}>
              <BiStar color="white" />
              <span>{el.vote_average}</span>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.pages}>
        {pagesArr.map((el, i) => (
          <div
            key={i}
            onClick={() => setPage(i)}
            className={styles.pageNumber}
          >
            {el}
          </div>
        ))}
      </div>
    </section>
  );
};

export default TopRated;
