import { Link } from "react-router-dom";
import logo from "../../assets/Logo.png";
import styles from "./NavBar.module.css";

export default function NavBar() {
  return (
    <div className={styles.navBarContainer}>
      <section className={styles.leftSection}>
        <img className={styles.img} src={logo} alt="logo" />
      </section>

      <section className={styles.middleSection}>
        <span className={styles.title}>FuttScore</span>
      </section>

      <section className={styles.rightSection}>
        <Link to="/login">
          <span className={styles.button}>Login</span>
        </Link>
      </section>
    </div>
  );
}
