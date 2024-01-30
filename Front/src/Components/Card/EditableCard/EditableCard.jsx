import { useEffect, useState } from "react";
import uploadCard from "../../../Utils/uploadCard";
import deleteImage from "../../../Utils/deleteImage";
import deleteRecordFS from "../../../Utils/deleteRecordFS";
import styles from "./EditableCard.module.css";

export default function EditableCard({ parameters }) {
  const [originalPicId, setOriginalPicId] = useState(null);
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
    uploadCard(info.ImgUrl);
    deleteImage(originalPicId);
    deleteRecordFS(originalPicId);
  }

  useEffect(() => {
    setInfo({
      ImgUrl: "",
      Description: parameters.data.Description,
      Price: parameters.data.Price,
      miniature: parameters.data.ImgUrl,
    });
    setOriginalPicId(parameters.id);
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

          <input
            type="text"
            name="Description"
            value={info.Description}
            className={styles.description}
            onChange={(event) => handleInputChange(event)}
          />

          <button onClick={() => handleSubmit()}>Guardar</button>
        </div>
      )}
    </>
  );
}
