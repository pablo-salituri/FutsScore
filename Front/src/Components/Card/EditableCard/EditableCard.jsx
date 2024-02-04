import { useEffect, useState } from "react";
import uploadCard from "../../../Utils/uploadCard";
import deleteImage from "../../../Utils/deleteImage";
import deleteRecordFS from "../../../Utils/deleteRecordFS";
import updateRecordFS from "../../../Utils/updateRecordFS";
import styles from "./EditableCard.module.css";

export default function EditableCard({ parameters }) {
  const [originalData, setOriginalData] = useState(null);
  const [info, setInfo] = useState(null);

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
      setInfo((prevData) => ({
        ...prevData,
        ImgUrl: file,
        miniature: reader.result,
      }));
    };

    reader.readAsDataURL(file);
  };

  function handleInputChange(event) {
    const prop = event.target.name;
    const value = event.target.value;
    setInfo({ ...info, [prop]: value });
  }

  function handleSubmit() {
    //Si se cambia la imagen, se hace el recambio de card
    if (info.ImgUrl) {
      uploadCard(info);
      deleteImage(originalData.id);
      deleteRecordFS(originalData.id);
    }

    // Si no se cambia la imagen, se hace el update de la card
    else {
      const changes = [];
      if (originalData.Description !== info.Description)
        changes.push("Description");
      if (originalData.Type !== info.Type) changes.push("Type");
      if (originalData.Price !== info.Price) changes.push("Price");

      changes.length && updateRecordFS(originalData.id, changes, info);
    }
  }

  useEffect(() => {
    setInfo({
      ImgUrl: "",
      Description: parameters.data.Description,
      Type: parameters.data.Type,
      Price: parameters.data.Price,
      miniature: parameters.data.ImgUrl,
    });
    setOriginalData({
      id: parameters.id,
      Price: parameters.data.Price,
      Type: parameters.data.Type,
      Description: parameters.data.Description,
    });
  }, []);

  return (
    <>
      {info && (
        <div className={styles.cardContainer}>
          <section className={styles.imageContainer}>
            <img
              className={styles.image}
              src={info.miniature}
              alt={info.miniature}
            />
            {/* <button type="file" className={styles.deleteButton}>
              Change
            </button> */}
            <input
              type="file"
              id="imageInput"
              name="image"
              accept="image/*"
              onChange={(event) => handleImagePreview(event)}
            />
          </section>
          <input
            type="text"
            name="Price"
            value={info.Price}
            className={styles.price}
            onChange={(event) => handleInputChange(event)}
          />

          {/* <input
            type="text"
            name="Description"
            value={info.Description}
            className={styles.description}
            onChange={(event) => handleInputChange(event)}
          /> */}

          <select
            defaultValue="-"
            onChange={(event) => {
              setInfo({ ...info, Type: event.target.value });
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

          <button onClick={() => handleSubmit()}>Guardar</button>
        </div>
      )}
    </>
  );
}
