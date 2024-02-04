import { useState } from "react";
import { Link } from "react-router-dom";
import NavBar from "../../NavBar/NavBar";
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
      <NavBar />
      <section>
        {/* <span>Descripción:</span>
        <input
          id="Description"
          type="text"
          autoComplete="off"
          onChange={(event) => handleInputChange(event)}
        /> */}
        <span>Tipo:</span>
        <select
          defaultValue="-"
          onChange={(event) => {
            setData({ ...data, Type: event.target.value });
          }}
        >
          <option disabled={true} value="-">
            -
          </option>
          <option value="Basket">Basket</option>
          <option value="Futbol_5">Fútbol 5</option>
          <option value="Futbol_11">Fútbol 11</option>
          <option value="Tenis">Tenis</option>
        </select>

        <span>Precio:</span>
        <input
          id="Price"
          type="text"
          autoComplete="off"
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
          data: {
            Description: data.Description,
            Type: data.Type,
            Price: data.Price,
            //Para la vista previa paso la miniatura. Para la carga, el File
            ImgUrl: data.miniature,
          },
        }}
      />
      <section>
        {/* <UploadImage file={data.ImgUrl} /> */}
        <button onClick={() => uploadCard(data)}>Subir</button>
        <Link to="/admin">
          <button>Cancelar</button>
        </Link>
      </section>
    </div>
  );
}
