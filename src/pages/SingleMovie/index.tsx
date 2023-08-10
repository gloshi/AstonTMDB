import { useParams } from "react-router-dom";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import React, { Fragment, useEffect } from "react";
import { fetchMovieDetails } from "../../store/slice/movies";
import styles from "../../styles/SingleFilm/SingleFilm.module.scss";
import {
  AiFillStar,
  AiOutlineHeart,
  AiOutlinePlaySquare,
} from "react-icons/ai";
import Load from "../Load";
import Button, { ButtonSize } from "../../components/Button";
import ActorsList from "../../components/ActorsList";

const SingleMovie: React.FC = () => {
  const dispatch = useAppDispatch();

  const movie = useAppSelector((state) => state.movies.movieDetails);
  const isLoading = useAppSelector((state) => state.movies.isLoadingDetails);
  const { id } = useParams<string>();

  useEffect(() => {
    dispatch(fetchMovieDetails(id || ""));
  }, []);

  if (isLoading || !Object.keys(movie).length) {
    return <Load />;
  }
  return (
    <main className={styles.container}>
      <div className={styles.moviecard}>
        <div>
          <img
            className={styles.poster}
            src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
            alt=""
          />
        </div>
        <div className={styles.info}>
          <h2 className={styles.title}>
            {movie.title} ({movie.release_date.slice(0, 4)})
          </h2>
          <div className={styles.rating}>
            <AiFillStar color="yellow" />
            <div>rating: {movie.vote_average}</div>
          </div>
          <div className={styles.genresBox}>
            {movie.genres.map((el) => (
              <i key={el.id}>{el.name}</i>
            ))}
          </div>
          <h4 className={styles.overview}>Overview</h4>
          <p className={styles.overviewText}>{movie.overview}</p>
          <div className={styles.buttons}>
            {movie.videos.results.slice(0, 1).map((video) => (
              <Fragment key={video.id}>
                <a
                  target="_blank"
                  href={`https://www.youtube.com/embed/${video.key}`}
                  className={styles.trailer}
                >
                  Watch Trailer <AiOutlinePlaySquare />
                </a>
              </Fragment>
            ))}

            <Button size={ButtonSize.XL} className={styles.favorite}>
              Add to favorite
              <AiOutlineHeart />
            </Button>
          </div>
        </div>
      </div>
      <div>
        <ActorsList list={movie.credits.cast} />
      </div>
    </main>
  );
};

export default SingleMovie;
