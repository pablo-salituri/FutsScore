import { useState } from "react";
import NavBar from "../../NavBar/NavBar";
import Card from "../../Card/Card";
import UploadImage from "../UploadImage/UploadImage";
import styles from "./AddItem.module.css";

export default function AddItem() {
  const [data, setData] = useState({
    Description: "",
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
      <NavBar />
      <section>
        <span>Descripción:</span>
        <input
          id="Description"
          type="text"
          onChange={(event) => handleInputChange(event)}
        />
        <span>Precio:</span>
        <input
          id="Price"
          type="text"
          onChange={(event) => handleInputChange(event)}
        />
      </section>
      <div
        style={{
          marginTop: "10px",
          border: "1px solid lightgray",
          padding: "10px",
          borderRadius: "5px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
        }}
        // onClick={() => document.getElementById("imageInput").click()}
      >
        Seleccionar Archivo
        <input
          type="file"
          id="imageInput"
          name="image"
          accept="image/*"
          /* style={{ display: "none" }} */
          onChange={(event) => handleImagePreview(event)}
        />
      </div>
      <h4>Vista Previa</h4>
      <Card
        parameters={{
          Description: data.Description,
          Price: data.Price,
          //Para la vista previa paso la miniatura. Para la carga, el File
          ImgUrl: data.miniature,
        }}
      />
      <section>
        <UploadImage file={data.ImgUrl} />
        <button>Cancelar</button>
      </section>
    </div>
  );
}
