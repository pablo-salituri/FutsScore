import NavBar from "../NavBar/NavBar";
import Home from "../Home/Home";
import styles from "./Admin.module.css";

export default function Admin() {
  return (
    <div className={styles.adminContainer}>
      <NavBar />
      <button className={styles.addButton}>+</button>
      <Home />
    </div>
  );
}
