import styles from '../../styles/GridFilms/GridFilms.module.scss'
import { GrFavorite } from "react-icons/gr";
import { useAppSelector } from "../../hooks/useAppSelector";
import Load from '../../pages/Load';
import { BiStar } from 'react-icons/bi';
import { memo } from 'react';

const NowPlaying: React.FC = memo(() => {
  const { nowPlaying, isLoading } = useAppSelector((state) => state.movies);

  if (isLoading) {
    return <Load/>
  }
 
  return (
    <section className={styles.wrapper}>
      <h3 className={styles.text}>NowPlaying movies</h3>
      <div className={styles.grid}>
        {nowPlaying.results.map((el, i) => (
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
            <div className={styles.rating}><BiStar color="white"/><span>{el.vote_average}</span></div>
          </div>
        ))}
      </div>
    </section>
  );
});

export default NowPlaying;