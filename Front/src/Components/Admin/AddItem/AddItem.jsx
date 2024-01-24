import { useState } from "react";
import NavBar from "../../NavBar/NavBar";
import Card from "../../Card/Card";
// import UploadImage from "../UploadImage/UploadImage";
import styles from "./AddItem.module.css";
//!BREAKPOINT
//!BREAKPOINT2
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

  const handleImageUpload = (e) => {
    const file = e.target.files[0];

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
          onChange={handleImageUpload}
        />
      </div>
      <h4>Vista Previa</h4>
      <Card
        /* parameters={{
          Price: 2000,
          Description: "Hola",
          ImgUrl:
            "https://firebasestorage.googleapis.com/v0/b/futsscore-be650.appspot.com/o/images%2F6f511a4a-7734-4596-940c-68a6e5e7b0c0?alt=media&token=b8380955-ffca-4693-a719-f07d0a4791b1",
        }} */
        parameters={{
          Description: data.Description,
          Price: data.Price,
          //Para la vista previa paso la miniatura. Para la carga, el File
          ImgUrl: data.miniature,
        }}
      />
      {/* <UploadImage /> */}
    </div>
  );
}
