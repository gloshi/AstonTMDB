import React from "react";

import styles from "../../styles/TopRated/TopRated.module.scss";
import { GrFavorite } from "react-icons/gr";
import { useAppSelector } from "../../hooks/useAppSelector";

const TopRated = () => {
  const { topRated, isLoading } = useAppSelector((state) => state.movies);

  if (isLoading) {
    return <div>loading...</div>;
  }
 
  return (
    <section className={styles.wrapper}>
      <h3 className={styles.text}>Top rated movies</h3>
      <div className={styles.grid}>
        {topRated.results.map((el, i) => (
          <div key={el.id} className={styles.card}>
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
            <div className={styles.params}>
              <span className={styles.year}>{el.release_date.slice(0, 4)}</span>
              <GrFavorite />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TopRated;
