import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { fetchPersonDetails } from "../../store/slice/movies";
import styles from "../../styles/SingleActor/SingleActor.module.scss";
import { useAppSelector } from "../../hooks/useAppSelector";
const SingleActor = () => {
  const { id } = useParams<string>();
  const params = useParams()
  const dispatch = useAppDispatch();
  const actor = useAppSelector((state) => state.movies.personDetails)
  useEffect(() => {
    dispatch(fetchPersonDetails(parseInt(id || "")));
  }, [dispatch, id]);
  const date = new Date()
  console.log(actor)
  return (
    <main>
      <div className={styles.container}>
        <div>
          <img
            className={styles.poster}
            src={`https://image.tmdb.org/t/p/original/${actor.profile_path}`}
            alt=""
          />
        </div>
        <div className={styles.info}>
          <h2 className={styles.name}>
            {actor.name}
          </h2>
          <h2 className={styles.birthday}>
          {date.getFullYear() - Number(actor?.birthday?.slice(0,4))} years
          </h2>
          <h4 className={styles.overview}>Biography</h4>
          <p className={styles.overviewText}>{actor.biography}</p>
        </div>
      </div>
    </main>
  );
};

export default SingleActor;
