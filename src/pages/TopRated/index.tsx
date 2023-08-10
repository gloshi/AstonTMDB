import styles from "../../styles/PageCategory/PageCategory.module.scss";
import { GrFavorite } from "react-icons/gr";
import { useAppSelector } from "../../hooks/useAppSelector";
import Load from "../Load";
import { useEffect, useState } from "react";
import { fetchTopRatedMovies } from "../../store/slice/movies";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { BiStar } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const TopRated: React.FC = () => {
  const { topRated, isLoading } = useAppSelector((state) => state.movies);
  const [page, setPage] = useState<number>(1);
  const [pageLoading, setPageLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    getMovies();
  }, [page]);

  const getMovies = async () => {
    setPageLoading(true);
    await dispatch(fetchTopRatedMovies(page));
    setPageLoading(false);
  };

  if (isLoading || pageLoading) {
    return <Load />;
  }

  return (
    <section className={styles.wrapper}>
      <h3 className={styles.text}>Top rated movies</h3>
      <div className={styles.grid}>
        {topRated.results.map((el, i) => (
          <div key={el.id} className={styles.card}>
            <img
              onClick={() => navigate(`/movie/${el.id}`)}
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
        <h4 className={styles.pageCount}>Page: {page}</h4>
        <select value={page} onChange={(e) => setPage(Number(e.target.value))}>
          {Array(topRated.total_pages)
            //@ts-ignore костыль
            .fill()
            .map((_, i) => (
              <option key={i} className={styles.pageNumber} value={i + 1}>
                {i + 1}
              </option>
            ))}
        </select>
      </div>
    </section>
  );
};

export default TopRated;
