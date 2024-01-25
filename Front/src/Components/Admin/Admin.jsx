import { Link } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import Home from "../Home/Home";
import styles from "./Admin.module.css";

export default function Admin() {
  return (
    <div className={styles.adminContainer}>
      <NavBar />
      <Link to="/admin/addItem">
        <button className={styles.addButton}>+</button>
      </Link>
      <Home />
    </div>
  );
}
