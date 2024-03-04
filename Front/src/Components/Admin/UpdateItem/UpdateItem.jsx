import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Card from "../../Card/Card";
import uploadCard from "../../../Utils/uploadCard";
import deleteImage from "../../../Utils/deleteImage";
import deleteRecordFS from "../../../Utils/deleteRecordFS";
import updateRecordFS from "../../../Utils/updateRecordFS";
import { firebaseApp } from "../../Firebase/credentials";
import { getFirestore, getDoc, doc } from "firebase/firestore";
import Swal from "sweetalert2";
import styles from "./UpdateItem.module.css";

const firestore = getFirestore(firebaseApp);

export default function UpdateItem() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [cardInfo, setCardInfo] = useState({ data: null });
  const [originalInfo, setOriginalInfo] = useState({ data: null });
  const [loading, setLoading] = useState(true);

  const cardParameters = cardInfo.data?.miniature
    ? {
        ...cardInfo,
        data: { ...cardInfo.data, ImgUrl: cardInfo.data.miniature },
      }
    : cardInfo;

  function handleInputChange(event) {
    const regex = /^[0-9]+$/;
    const field = event.target.id;
    const value = event.target.value;
    if (regex.test(value) || value === "") {
      setCardInfo({ ...cardInfo, data: { ...cardInfo.data, [field]: value } });
    }
  }

  const handleImagePreview = (event) => {
    const file = event.target.files[0];

    // Si el usuario cancela la selección, no hace nada
    if (!file) {
      return;
    }

    // Muestra la miniatura inmediatamente
    const reader = new FileReader();
    reader.onload = () => {
      setCardInfo({
        ...cardInfo,
        data: { ...cardInfo.data, ImgUrl: file, miniature: reader.result },
      });
    };

    reader.readAsDataURL(file);
  };

  function handleConfirmation() {
    Swal.fire({
      title: "¿Guardar cambios?",
      // text: "Esta acción no es reversible",
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
          handleSubmit();
        } catch (error) {
          Swal.fire({
            title: "Error al modificar  el artículo",
            // text: "Error al eliminar el artículo",
            icon: "error",
          });
        }
      }
    });
  }

  function handleSubmit() {
    //Si se cambia la imagen, se crea la propiedad miniature; por lo que se hace el recambio de card
    if (cardInfo.data.miniature) {
      console.log("con cambio de foto");
      uploadCard("edicion", cardInfo.data);
      deleteImage(originalInfo.id);
      deleteRecordFS(originalInfo.id);
    }

    // Si no se cambia la imagen, se hace el update de la card
    else {
      console.log("sin cambio de foto");
      const changes = [];
      /* if (originalInfo.Description !== cardInfo.Description)
        changes.push("Description"); */
      if (originalInfo.data.Type !== cardInfo.data.Type) changes.push("Type");
      if (originalInfo.data.Price !== cardInfo.data.Price)
        changes.push("Price");

      changes.length && updateRecordFS(originalInfo.id, changes, cardInfo.data);
    }

    Swal.fire({
      title: "Artículo modificado correctamente",
      // text: "Artículo eliminado correctamente",
      icon: "success",
    }).then((okay) => {
      if (okay) {
        navigate("/admin");
      }
    });
  }

  /* const handleUpload = async () => {

    try {
      await uploadCard("carga", cardInfo);
      navigate("/admin");
    } catch (error) {
      console.error(error);
    }
  }; */

  useEffect(() => {
    async function getData(uid) {
      const docuRef = doc(firestore, `Cards/${uid}`);
      const docuCifrada = await getDoc(docuRef);
      const finalInfo = docuCifrada.data();
      setCardInfo({ data: finalInfo, id: uid });
      setOriginalInfo({ data: finalInfo, id: uid });
      setLoading(false);
    }

    getData(id);
  }, []);

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div className={styles.addItemContainer}>
      <div className={styles.addItemOuter}>
        <div className={styles.addItemInner}>
          <h2 className={styles.title}>Editar Producto</h2>
          <section className={styles.dataSection}>
            {/* <span>Descripción:</span>
            <input
              id="Description"
              type="text"
              autoComplete="off"
              onChange={(event) => handleInputChange(event)}
            /> */}

            <section
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <span style={{ marginBottom: "10%" }}>Tipo:</span>
              <select
                defaultValue={cardInfo.data && cardInfo.data.Type}
                className={styles.select}
                onChange={(event) => {
                  // setCardInfo({ ...cardInfo, Type: event.target.value });
                  setCardInfo({
                    ...cardInfo,
                    data: { ...cardInfo.data, Type: event.target.value },
                  });
                }}
              >
                <option value="Basket">Basket</option>
                <option value="Futbol_5">Fútbol 5</option>
                <option value="Futbol_11">Fútbol 11</option>
                <option value="Tenis">Tenis</option>
              </select>
            </section>

            <section
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <span style={{ marginBottom: "10%" }}>Precio:</span>
              <input
                id="Price"
                type="text"
                autoComplete="off"
                className={styles.input}
                value={cardInfo.data.Price}
                onChange={(event) => handleInputChange(event)}
              />
            </section>
          </section>
          <div className={styles.selectImageContainer}>
            <h4 style={{ margin: "0 0 10px 0" }}>Seleccionar Archivo</h4>
            <section style={{ display: "flex", justifyContent: "center" }}>
              <input
                type="file"
                id="imageInput"
                name="image"
                accept="image/*"
                onChange={(event) => handleImagePreview(event)}
              />
            </section>
          </div>
          <h4 style={{ margin: 0 }}>Vista Previa</h4>
          <section className={styles.cardContainerInAdd}>
            {cardInfo.data && <Card parameters={cardParameters} />}
          </section>
          <section>
            <section className={styles.buttonSection}>
              <button
                className={styles.button}
                style={
                  !cardInfo.data.Price ? { backgroundColor: "#9a7d9a" } : {}
                }
                onClick={() => handleConfirmation()}
                disabled={!cardInfo.data.Price}
              >
                Guardar cambios
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
