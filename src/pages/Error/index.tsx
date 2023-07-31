import { Link } from "react-router-dom";
import styles from "../../styles/Error/Error.module.scss";
import { AppRoutes } from "../../approutes/RoutesConfig";

const ErrorPage: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <h3>Error: Page is not found</h3>
      <Link to={AppRoutes.MAIN}>Back to main page</Link>
    </div>
  );
};

export default ErrorPage;
