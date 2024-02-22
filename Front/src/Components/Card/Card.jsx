import { useLocation, Link } from "react-router-dom";
import { MdModeEdit, MdDelete } from "react-icons/md";
import styles from "./Card.module.css";

export default function Card({ parameters, handleDeleteCard }) {
  const location = useLocation().pathname;

  return (
    <div className={styles.cardContainer}>
      <section className={styles.imageContainer}>
        {location === "/admin" && (
          <Link to={`/admin/editItem/${parameters.id}`}>
            <div className={styles.editContainer}>
              <MdModeEdit />
            </div>
          </Link>
        )}
        <img
          className={styles.image}
          src={parameters.data.ImgUrl}
          alt={parameters.data.ImgUrl}
        />
        {location === "/admin" && (
          <div className={styles.deleteContainer}>
            <MdDelete onClick={() => handleDeleteCard(parameters.id)} />

            {/* <button
              className={styles.deleteButton}
              onClick={() => handleDeleteCard(parameters.id)}
            >
              El
            </button> */}
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
