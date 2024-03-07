import { useLocation, Link } from "react-router-dom";
import { MdModeEdit, MdDelete } from "react-icons/md";
import defaultImage from "../../assets/defaultImage.jpg";
import styles from "./Card.module.css";

export default function Card({
  parameters,
  handleDeleteCard,
  isLastCard,
  setIsLoading,
}) {
  const location = useLocation().pathname;

  return (
    <div className={styles.cardContainer}>
      <section className={styles.imageContainer}>
        {location === "/admin" && (
          <Link to={`/admin/updateItem/${parameters.id}`}>
            <div className={styles.editContainer}>
              <MdModeEdit />
            </div>
          </Link>
        )}
        <img
          className={styles.image}
          src={parameters.data.ImgUrl || defaultImage}
          alt={parameters.data.ImgUrl}
          onLoad={() => {
            if (isLastCard) setIsLoading(false);
          }}
        />
        {location === "/admin" && (
          <div
            className={styles.deleteContainer}
            onClick={() => handleDeleteCard(parameters.id)}
          >
            <MdDelete />
          </div>
        )}
      </section>
      <span className={styles.type}>
        {parameters.data.Type === "Futbol_11"
          ? "Fútbol 11"
          : parameters.data.Type === "Futbol_5"
          ? "Fútbol 5"
          : parameters.data.Type}
      </span>
      {/* <span className={styles.description}>
        Descripción: {parameters.data.Description}
      </span> */}
      <span className={styles.price}>
        $ {Number(parameters.data.Price).toLocaleString()}
      </span>
    </div>
  );
}
