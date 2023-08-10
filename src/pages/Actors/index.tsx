import styles from "../../styles/PageCategory/PageCategory.module.scss";
import { GrFavorite } from "react-icons/gr";
import { useAppSelector } from "../../hooks/useAppSelector";
import Load from "../Load";
import { BiStar } from "react-icons/bi";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useNavigate } from "react-router-dom";
import { fetchActors } from "../../store/slice/movies";

const Actors: React.FC = () => {
  const { actors, isLoading } = useAppSelector((state) => state.movies);
  const [page, setPage] = useState<number>(1);
  const [pageLoading, setPageLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    getMovies();
  }, [page]);

  const getMovies = async () => {
    setPageLoading(true);
    await dispatch(fetchActors(page));
    setPageLoading(false);
  };
  if (isLoading || pageLoading) {
    return <Load />;
  }
  return (
    <section className={styles.wrapper}>
      <h3 className={styles.text}>Actors</h3>
      <div className={styles.grid}>
        {actors.results.map((el, i) => (
          <div key={el.id} className={styles.card}>
            <img
              onClick={() => navigate(`/actor/${el.id}`)}
              className={styles.poster}
              src={`https://image.tmdb.org/t/p/original/${el.profile_path}`}
              alt={el.name}
            />
            <span
              style={
                el.name?.length < 28
                  ? { fontSize: "20px" }
                  : { fontSize: "14px" }
              }
              className={styles.title}
            >
              {el.name}
            </span>
          </div>
        ))}
      </div>
      <div className={styles.pages}>
        <h4 className={styles.pageCount}>Page: {page}</h4>
        <select value={page} onChange={(e) => setPage(Number(e.target.value))}>
          {Array(actors.total_pages)
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

export default Actors;
