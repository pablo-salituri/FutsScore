import { useEffect, useState } from "react";
import styles from "./EditableCard.module.css";

export default function EditableCard({ parameters }) {
  const [info, setInfo] = useState(null);

  function handleInputChange(event) {
    const prop = event.target.name;
    const value = event.target.value;
    setInfo({ ...info, [prop]: value });
  }

  useEffect(() => {
    setInfo({
      ImgUrl: parameters.data.ImgUrl,
      Description: parameters.data.Description,
      Price: parameters.data.Price,
    });
  }, []);

  return (
    <>
      {info && (
        <div className={styles.cardContainer}>
          <section className={styles.imageContainer}>
            <img className={styles.image} src={info.ImgUrl} alt={info.ImgUrl} />
            <button className={styles.deleteButton}>Change</button>
          </section>
          <input
            type="text"
            name="Price"
            value={info.Price}
            className={styles.price}
            onChange={(event) => handleInputChange(event)}
          />
          {/* <span className={styles.price}>Precio: {info.Price}</span> */}
          <input
            type="text"
            name="Description"
            value={info.Description}
            className={styles.description}
            onChange={(event) => handleInputChange(event)}
          />
          {/* <span className={styles.description}>
            Descripción: {info.Description}
          </span> */}
        </div>
      )}
    </>
  );
}
