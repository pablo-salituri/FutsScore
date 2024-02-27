import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { firebaseApp } from "../../Firebase/credentials";
import { getDocs, collection, getFirestore } from "firebase/firestore";
import { FaArrowAltCircleDown, FaArrowAltCircleUp } from "react-icons/fa";
import updatePrices from "../../../Utils/updatePrices";
import Swal from "sweetalert2";
import styles from "./AdminTools.module.css";

const firestore = getFirestore(firebaseApp);

export default function AdminTools() {
  const navigate = useNavigate();

  const [cardList, setCardList] = useState([]);
  const [action, setAction] = useState(null);
  const [percentage, setPercentage] = useState(null);
  const [input, setInput] = useState("");

  const custom = ["5", "10", "15", "20", "Otro:"];

  function handleInputChange(value) {
    const regex = /^[1-9][0-9]*$/;
    if (regex.test(value) || value === "") {
      setInput(
        // El parseFloat es porque sino toma el contenido como string y no filtra correctamente
        value ? parseFloat(value) : ""
      );
    }
  }

  function checkDisabled() {
    if (!action || !percentage) return true;
    if (percentage === "Otro:" && !input) return true;
    return false;
  }

  const handleUpload = () => {
    Swal.fire({
      title: `¿${action} todos los precios ${
        percentage === "Otro:" ? input : percentage
      }%?`,
      // text:
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar",
      allowOutsideClick: false,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await updatePrices(
            cardList,
            action,
            percentage !== "Otro:" ? percentage : input
          );
          Swal.fire({
            title: "Los precios se han modificado correctamente",
            // text: "Artículo creado correctamente",
            icon: "success",
          }).then((okay) => {
            if (okay) {
              navigate("/admin");
            }
          });
        } catch (error) {
          Swal.fire({
            title: "Error al modificar  los precios",
            // text: "Error al eliminar el artículo",
            icon: "error",
          });
        }
      }
    });
  };

  async function getDataFromFirestore() {
    const querySnapshot = await getDocs(collection(firestore, "Cards"));
    const newData = querySnapshot.docs.map((doc) => {
      return {
        data: doc.data(),
        id: doc.id,
      };
    });
    setCardList(newData);
  }

  useEffect(() => {
    getDataFromFirestore();
  }, []);

  return (
    <div className={styles.adminToolsContainer}>
      <div className={styles.adminToolsOuter}>
        <div className={styles.adminToolsInner}>
          <h2 style={{ textAlign: "center", margin: 0 }}>Modificar Precios</h2>
          <section className={styles.upDownSection}>
            <div className={styles.iconContainer}>
              <FaArrowAltCircleUp
                className={styles.icon}
                style={action === "Aumentar" ? { color: "#5af35a" } : {}}
                onClick={() => setAction("Aumentar")}
              />
            </div>
            <div className={styles.iconContainer}>
              <FaArrowAltCircleDown
                className={styles.icon}
                style={action === "Reducir" ? { color: "red" } : {}}
                onClick={() => setAction("Reducir")}
              />
            </div>
          </section>
          {custom.map((elem) => (
            <section key={elem}>
              <label>
                <input
                  type="radio"
                  value={elem}
                  name="customPrice"
                  // checked={data.Price === number}
                  onChange={() => {
                    setPercentage(elem);
                    if (elem !== "Otro:") setInput("");
                  }}
                />
                {elem !== "Otro:" ? `${elem}%` : elem}
              </label>
              {elem === "Otro:" && percentage === "Otro:" && (
                <input
                  id="Price"
                  type="text"
                  autoComplete="off"
                  placeholder="%"
                  value={input}
                  className={styles.input}
                  onChange={(event) => handleInputChange(event.target.value)}
                />
              )}
            </section>
          ))}
          <section>
            <section className={styles.buttonSection}>
              <button
                className={styles.button}
                style={checkDisabled() ? { backgroundColor: "#9a7d9a" } : {}}
                onClick={() => handleUpload()}
                disabled={checkDisabled()}
              >
                Modificar
              </button>
              <Link to="/admin" style={{ display: "contents" }}>
                <button className={styles.button}>Cancelar</button>
              </Link>
            </section>
          </section>
        </div>
      </div>
    </div>
  );
}
