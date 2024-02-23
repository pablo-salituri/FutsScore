import { useState } from "react";
import { Link } from "react-router-dom";
import Card from "../../Card/Card";
import uploadCard from "../../../Utils/uploadCard";
// import UploadImage from "../UploadImage/UploadImage";
import styles from "./AddItem.module.css";

export default function AddItem() {
  const [data, setData] = useState({
    Description: "",
    Type: "-",
    Price: null,
    ImgUrl: "",
    miniature: "",
  });

  function handleInputChange(event) {
    const field = event.target.id;
    const value = event.target.value;
    setData({ ...data, [field]: value });
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
      // Actualizar el estado local con la nueva imagen y la miniatura
      setData((prevData) => ({
        ...prevData,
        ImgUrl: file,
        miniature: reader.result,
      }));
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className={styles.addItemContainer}>
      <div className={styles.addItemOuter}>
        <div className={styles.addItemInner}>
          <h2 style={{ textAlign: "center", margin: 0 }}>Agregar Producto</h2>
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
                // defaultValue="-"
                className={styles.select}
                onChange={(event) => {
                  setData({ ...data, Type: event.target.value });
                }}
              >
                {/* <option disabled={true} value="-">
                  -
                </option> */}
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
                onChange={(event) => handleInputChange(event)}
              />
            </section>
          </section>
          <div
            className={styles.selectImageContainer}
            // onClick={() => document.getElementById("imageInput").click()}
          >
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
            <Card
              parameters={{
                data: {
                  Description: data.Description,
                  Type: data.Type,
                  Price: data.Price,
                  //Para la vista previa paso la miniatura. Para la carga, el File
                  ImgUrl: data.miniature,
                },
              }}
            />
          </section>
          <section>
            {/* <UploadImage file={data.ImgUrl} /> */}
            <section className={styles.buttonSection}>
              <button
                className={styles.button}
                onClick={() => uploadCard(data)}
              >
                Subir
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
