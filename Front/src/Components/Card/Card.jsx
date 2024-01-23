import styles from "./Card.module.css";

export default function Card({ parameters }) {
  return (
    <div className={styles.cardContainer}>
      <img
        className={styles.image}
        src={parameters.ImgUrl}
        alt={parameters.ImgUrl}
      />
      <span className={styles.price}>Precio: {parameters.Price}</span>
      <span className={styles.description}>
        Descripción: {parameters.Description}
      </span>
    </div>
  );
}
