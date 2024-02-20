import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/Logo.png";
import styles from "./Navbar.module.css";

export default function NavBar() {
  const location = useLocation().pathname;

  return (
    <div className={styles.navBarContainer}>
      <section className={styles.leftSection}>
        <img className={styles.img} src={logo} alt="logo" />
      </section>

      <section className={styles.middleSection}>
        <span className={styles.title}>FuttScore</span>
      </section>

      <section className={styles.rightSection}>
        {location === "/" ? (
          <Link to="/login">
            <span className={styles.button}>Login</span>
          </Link>
        ) : (
          <span className={styles.button}>Logout</span>
        )}
      </section>
    </div>
  );
}
