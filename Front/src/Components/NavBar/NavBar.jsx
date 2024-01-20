import logo from "../../assets/Logo.png";
import styles from "./NavBar.module.css";

export default function NavBar() {
  return (
    <div className={styles.navBarContainer}>
      <img className={styles.img} src={logo} alt="logo" />
      <span className={styles.title}>FuttScore</span>
      <button className={styles.button}>Login</button>
    </div>
  );
}
