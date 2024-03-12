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
// import checkIfLogged from "../../Utils/checkIfLogged";
import Swal from "sweetalert2";
import load from "../../assets/load.gif";
import styles from "./Home.module.css";

const firestore = getFirestore(firebaseApp);

export default function Home() {
  const location = useLocation().pathname === "/" ? "Home" : "Not Home";

  const [width, setWidth] = useState(window.innerWidth);
  const [cardList, setCardList] = useState([]);
  const [render, setRender] = useState(false); //Sólo sirve para forzar el re-render despues de eliminar un artículo
  const [isLoading, setIsLoading] = useState(true);

  const filter = useSelector((state) =>
    location === "Home" ? state.publicFilter : state.adminFilter
  );

  const atLeastOneElement = cardList?.some((card) => {
    return (
      filter.sports[card.data.Type] &&
      (filter.smallest === "" ||
        (card.data.Price >= filter.smallest &&
          card.data.Price <= filter.largest))
    );
  });

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

    /* async function fetchData() {
      const answer = await checkIfLogged();
      console.log(answer);
    }
    fetchData(); */
  }, [render]);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {!isLoading ? null : (
        <img
          src={load}
          alt="Loading"
          style={{ margin: "auto", height: "20%" }}
        />
      )}
      <div
        className={styles.homeContainer}
        style={isLoading ? { display: "none" } : {}}
      >
        {location === "Not Home" && width < 1025 && (
          <Link to="/admin/addItem" style={{ display: "contents" }}>
            <div className={styles.uploadContainer}>
              <IoMdCloudUpload className={styles.icon} />
            </div>
          </Link>
        )}

        {location === "Not Home" && width < 1025 && (
          <Link to="/admin/AdminTools" style={{ display: "contents" }}>
            <div className={styles.toolContainer}>
              <AiFillTool className={styles.icon} />
            </div>
          </Link>
        )}

        {atLeastOneElement ? (
          cardList.map((card, index) => {
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
                  <Card
                    parameters={card}
                    handleDeleteCard={handleDeleteCard}
                    isLastCard={cardList.length - 1 === index}
                    setIsLoading={setIsLoading}
                  />
                </section>
              );
            else return null;
          })
        ) : (
          <span className={styles.emptyFilters}>
            No hay elementos que coincidan con la búsqueda
          </span>
        )}
      </div>
    </>
  );
}
