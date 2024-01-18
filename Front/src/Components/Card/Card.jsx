import styles from "./Card.module.css";

export default function Card({ parameters }) {
  return (
    <div className={styles.cardContainer}>
      <img
        className={styles.image}
        src={parameters.image}
        alt={parameters.id}
      />
      <span className={styles.price}>Precio: {parameters.price}</span>
      <span className={styles.description}>
        Descripción: {parameters.description}
      </span>
    </div>
  );
}
