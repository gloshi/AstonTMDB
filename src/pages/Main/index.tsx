
import Banner from "../../components/Banner";
import styles from "../../styles/Main/Main.module.scss";
import TopRated from "../../components/TopRated";
import Upcoming from "../../components/Upcoming";
import NowPlaying from "../../components/NowPlaying";
import Load from "../Load";

const Main: React.FC = () => {

  return (
    <main className={styles.wrapper}>
        <Banner />
      <div className={styles.center}>
        <TopRated />
        <Upcoming/>
        <NowPlaying/>
      </div>
    </main>
  );
};
export default Main;
