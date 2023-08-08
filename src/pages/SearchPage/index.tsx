import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { searchMovies, searchPerson } from "../../store/slice/movies";
import styles from "../../styles/SearchPage/SearchPage.module.scss";
import Button, { ButtonSize } from "../../components/Button";
import noPhoto from "../../img/nophoto.png";
import { useNavigate } from "react-router-dom";
const SearchPage: React.FC = () => {
  const searchValue = useAppSelector((state) => state.search.value);
  const searchMovie = useAppSelector((state) => state.movies.search);
  const Actor = useAppSelector((state) => state.movies.searchActor);
  const searchLoading = useAppSelector((state) => state.movies.searchLoading);
  const [visible, setVisible] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate()
  useEffect(() => {
    dispatch(searchMovies({ searchValue }));
    dispatch(searchPerson({ searchValue }));
  }, []);
  return (
    <main className={styles.container}>
      <div className={styles.box}>
        <h3 className={styles.res}>Search results</h3>
        <div className={styles.buttons}>
          <Button onClick={() => setVisible(false)} size={ButtonSize.XL}>
            Movies: {searchMovie.results.length}
          </Button>
          <Button onClick={() => setVisible(true)} size={ButtonSize.XL}>
            Actors: {Actor.results.length}
          </Button>
        </div>
      </div>
      <div className={styles.searchResults}>
        <div>
          {!visible ? (
            <div className={styles.search}>
              {searchMovie.results.map((el) => (
                <div className={styles.card}>
                  <img
                    src={
                      el.backdrop_path === null
                        ? noPhoto
                        : `https://image.tmdb.org/t/p/original/${el.poster_path}`
                    }
                    onClick={() => navigate(`/movie/${el.id}`)}
                    alt={el.title}
                  />
                  <h3>{el.title}</h3>
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.search}>
              {Actor.results.map((el) => (
                <div className={styles.card}>
                  <img
                    src={
                      el.profile_path === null
                        ? noPhoto
                        : `https://image.tmdb.org/t/p/original/${el.profile_path}`
                    }
                    onClick={() => navigate(`/actor/${el.id}`)}
                    alt={el.name}
                  />
                  <h3>{el.name}</h3>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default SearchPage;
