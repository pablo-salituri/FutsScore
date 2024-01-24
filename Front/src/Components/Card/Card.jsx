import { useLocation } from "react-router-dom";
import styles from "./Card.module.css";

export default function Card({ parameters }) {
  const location = useLocation().pathname;

  return (
    <div className={styles.cardContainer}>
      <section className={styles.imageContainer}>
        {location === "/admin" && (
          <button className={styles.editButton}>Ed</button>
        )}
        <img
          className={styles.image}
          src={parameters.ImgUrl}
          alt={parameters.ImgUrl}
        />
        {location === "/admin" && (
          <button className={styles.deleteButton}>El</button>
        )}
      </section>
      <span className={styles.price}>Precio: {parameters.Price}</span>
      <span className={styles.description}>
        Descripción: {parameters.Description}
      </span>
    </div>
  );
}
