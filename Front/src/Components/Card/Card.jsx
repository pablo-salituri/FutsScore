import styles from "./Card.module.css";

export default function Card({ parameters }) {
  return (
    <div className={styles.cardContainer}>
      <section className={styles.imageContainer}>
        <img
          className={styles.image}
          src={parameters.ImgUrl}
          alt={parameters.ImgUrl}
        />
      </section>
      <span className={styles.price}>Precio: {parameters.Price}</span>
      <span className={styles.description}>
        Descripción: {parameters.Description}
      </span>
    </div>
  );
}
