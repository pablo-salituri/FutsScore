import { useLocation, Link } from "react-router-dom";
import styles from "./Card.module.css";

export default function Card({ parameters }) {
  const location = useLocation().pathname;

  return (
    <div className={styles.cardContainer}>
      <section className={styles.imageContainer}>
        {location === "/admin" && (
          <Link to={`/admin/editItem/${parameters.id}`}>
            <button className={styles.editButton}>Ed</button>
          </Link>
        )}
        <img
          className={styles.image}
          src={parameters.data.ImgUrl}
          alt={parameters.data.ImgUrl}
        />
        {location === "/admin" && (
          <button className={styles.deleteButton}>El</button>
        )}
      </section>
      <span className={styles.price}>Precio: {parameters.data.Price}</span>
      <span className={styles.description}>
        Descripción: {parameters.data.Description}
      </span>
    </div>
  );
}
