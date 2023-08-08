import { Link } from "react-router-dom";
import styles from "../../styles/Header/Header.module.scss";
import Search from "../Search";
import { AppRoutes } from "../../approutes/RoutesConfig";
import { memo } from "react";
import Logo from "../../img/logo.png";

const Header: React.FC = memo(() => {
  return (
    <header className={styles.container}>
      <div>
        <Link to={AppRoutes.MAIN}>
          <img className={styles.logo} src={Logo} alt="logo" />
        </Link>
      </div>
      <div className={styles.leftbar}>
        <Search />
        <nav className={styles.links}>
          <Link to={AppRoutes.MAIN}>Home</Link>
          <Link to={AppRoutes.TOP_RATED}>Top Rated</Link>
          <Link to={AppRoutes.UPCOMING}>Upcoming</Link>
          <Link to={AppRoutes.NOWPLAYNG}>Now Playing</Link>
          <Link to={AppRoutes.ACTORS}>Actors</Link>
          <Link to={AppRoutes.FAVORITES}>Favorites</Link>
        </nav>
      </div>
    </header>
  );
});
export default Header;
