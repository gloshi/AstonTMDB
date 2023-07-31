import { Link } from "react-router-dom";
import styles from "../../styles/Header/Header.module.scss";
import Search from "../Search";
import { AppRoutes } from "../../approutes/RoutesConfig";
import { memo } from "react";
import Logo from '../../img/logo.png' 

const Header: React.FC = memo(() => {
  return (
    <header className={styles.container}>
      <div>
        <img className={styles.logo} src={Logo} alt="logo" />
      </div>
      <div className={styles.leftbar}>
        <Search />
        <nav className={styles.links}>
          <Link to={AppRoutes.MAIN}>Home</Link>
          <Link to={AppRoutes.TOP_RATED}>Best RANKING</Link>
          <Link to={AppRoutes.GENRES}>Genres</Link>
          <Link to={""}>Sign in</Link>
        </nav>
      </div>
    </header>
  );
});
export default Header;
