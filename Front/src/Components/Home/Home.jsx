import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, Link } from "react-router-dom";
import Card from "../Card/Card";
import { firebaseApp } from "../Firebase/credentials";
import { getDocs, collection, getFirestore } from "firebase/firestore";
import deleteRecordFS from "../../Utils/deleteRecordFS";
import deleteImage from "../../Utils/deleteImage";
import { IoMdCloudUpload } from "react-icons/io";
import { AiFillTool } from "react-icons/ai";
import Swal from "sweetalert2";
import styles from "./Home.module.css";

const firestore = getFirestore(firebaseApp);

export default function Home() {
  const location = useLocation().pathname === "/" ? "Home" : "Not Home";

  const [cardList, setCardList] = useState([]);
  const [render, setRender] = useState(false); //Sólo sirve para forzar el re-render despues de eliminar un artículo

  const filter = useSelector((state) =>
    location === "Home" ? state.publicFilter : state.adminFilter
  );

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

  function handleDeleteCard(uid) {
    Swal.fire({
      title: "¿Eliminar artículo?",
      text: "Esta acción no es reversible",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar",
      allowOutsideClick: false,
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          deleteImage(uid);
          deleteRecordFS(uid);
          setRender(!render);
          Swal.fire({
            title: "Artículo eliminado correctamente",
            // text: "Artículo eliminado correctamente",
            icon: "success",
          });
        } catch (error) {
          Swal.fire({
            title: "Error al eliminar el artículo",
            // text: "Error al eliminar el artículo",
            icon: "error",
          });
        }
      }
    });
  }

  useEffect(() => {
    getDataFromFirestore();
  }, [render]);

  return (
    <div className={styles.homeContainer}>
      {location === "Not Home" && (
        <Link to="/admin/addItem" style={{ display: "contents" }}>
          <div className={styles.uploadContainer}>
            <IoMdCloudUpload className={styles.icon} />
          </div>
        </Link>
      )}

      {location === "Not Home" && (
        <div className={styles.toolContainer}>
          <AiFillTool className={styles.icon} />
        </div>
      )}
      {cardList.map((card) => {
        if (
          filter.sports[card.data.Type] &&
          (filter.smallest === "" ||
            (card.data.Price >= filter.smallest &&
              card.data.Price <= filter.largest))
        )
          return (
            <section
              key={card.data.ImgUrl}
              className={styles.cardContainerInHome}
            >
              <Card parameters={card} handleDeleteCard={handleDeleteCard} />
            </section>
          );
        else return null;
      })}
    </div>
  );
}
