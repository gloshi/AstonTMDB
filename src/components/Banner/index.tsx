import React, { memo, useMemo, useState } from "react";
import { RootState } from "../../store";
import { useSelector } from "react-redux";

import styles from "../../styles/Banner/Banner.module.scss";
import Button from "../Button";
import { AiOutlineArrowRight, AiOutlineArrowLeft } from "react-icons/ai";
import Load from "../../pages/Load";
const Banner: React.FC = memo(() => {
  const { popular, isLoading } = useSelector(
    (state: RootState) => state.movies
  );
  const bannerArray = useMemo(() => popular.results.slice(0, 7), [popular]);
  const numbersArray = [1, 2, 3, 4, 5, 6, 7];
  const [slideIndex, setSlideIndex] = useState<number>(1);
  const memoArr = useMemo(
    () =>
      numbersArray.map((el, i) => (
        <span
          onClick={() => move(i + 1)}
          className={
            slideIndex - 1 === i ? styles.numbers : styles.numbersActive
          }
          key={i}
        >
          {el}
        </span>
      )),
    [slideIndex]
  );
  const nextSlide = () => {
    if (slideIndex !== bannerArray.length) {
      setSlideIndex(slideIndex + 1);
    } else if (slideIndex === bannerArray.length) {
      setSlideIndex(1);
    }
  };
  const prevSlide = () => {
    if (slideIndex !== 1) {
      setSlideIndex(slideIndex - 1);
    } else if (slideIndex === 1) {
      setSlideIndex(bannerArray.length);
    }
  };
  if (isLoading || popular.results.length === 0) {
    return <Load />;
  }
  const move = (index: number) => {
    setSlideIndex(index);
  };

  return (
    <section className={styles.wrapper}>
      <img
        className={styles.bannerimg}
        src={`https://image.tmdb.org/t/p/original/${
          bannerArray[slideIndex - 1]?.backdrop_path
        }`}
        alt={bannerArray[1].title}
      />
      <div className={styles.arrows}>
        <Button className={styles.arrowLeft} onClick={prevSlide}>
          <AiOutlineArrowLeft />
        </Button>
        {memoArr}
        <Button className={styles.arrowRight} onClick={nextSlide}>
          <AiOutlineArrowRight />
        </Button>
      </div>
    </section>
  );
});

export default Banner;
