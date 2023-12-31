import { memo, useEffect, useState } from "react";
import styles from "../../styles/GridFilms/GridFilms.module.scss";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { IMovie, fetchTopRatedMovies } from "../../store/slice/movies";
import Load from "../../pages/Load";
import { Link } from "react-router-dom";
import { AppRoutes } from "../../approutes/RoutesConfig";
import { GrFavorite } from "react-icons/gr";
import { BiStar } from "react-icons/bi";
import { PaginableResult } from "../../store/types";
import Button, { ButtonSize, ThemeButtonChanger } from "../Button";

interface GridFilmsProps {
  category: IMovie[];
  isLoading: boolean;
  text: string;
  route: string;
}

const GridFilms = memo(
  ({ category, text, isLoading, route }: GridFilmsProps) => {
    // const [page, setPage] = useState<number>(1);
    const [pageLoading, setPageLoading] = useState<boolean>(false);
    const dispatch = useAppDispatch();

    // useEffect(() => {
    //   getMovies();
    // }, [page]);

    // //get
    // const getMovies = async () => {
    //   setPageLoading(true);
    //   await dispatch(fetchMovies(page));
    //   setPageLoading(false);
    // };

    if (isLoading || pageLoading) {
      return <Load />;
    }
    return (
      <section className={styles.wrapper}>
        <h3 className={styles.text}>{text} movies</h3>
        <div className={styles.grid}>
          {category.map((el) => (
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
                <span className={styles.year}>
                  {el.release_date.slice(0, 4)}
                </span>
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
          <Link to={route}>
            <Button theme={ThemeButtonChanger.CLEAR} size={ButtonSize.M}>
              Показать все
            </Button>
          </Link>
        </div>
      </section>
    );
  },
);

export default GridFilms;
