import { Link } from "react-router-dom";
import logo from "../../assets/Logo.png";
import styles from "./NavBar.module.css";

export default function NavBar() {
  return (
    <div className={styles.navBarContainer}>
      <img className={styles.img} src={logo} alt="logo" />
      <span className={styles.title}>FuttScore</span>
      <Link to="/login">
        <span className={styles.button}>Login</span>
      </Link>
    </div>
  );
}
