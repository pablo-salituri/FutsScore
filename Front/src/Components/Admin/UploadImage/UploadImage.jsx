import { useState, useEffect } from "react";
import { storage, firebaseApp } from "../../Firebase/credentials";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { v4 } from "uuid";
/* import styles from "./Admin.module.css"; */

export default function UploadImage({ file }) {
  const firestore = getFirestore(firebaseApp);

  const [imageUpload, setImageUpload] = useState(null);

  async function createInFirestore(uid, url) {
    const docuRef = doc(firestore, `Cards/${uid}`);

    setDoc(docuRef, {
      Description: "prueba",
      ImgUrl: url,
      Price: 1,
    });
  }

  function uploadImage() {
    if (imageUpload === null) return;
    const name = v4();
    const imageRef = ref(storage, `images/${name}`);
    uploadBytes(imageRef, imageUpload).then(() => {
      getDownloadURL(imageRef)
        .then((url) => {
          createInFirestore(name, url).then(() => alert("Image uploaded"));
        })
        .catch((error) => {
          // Manejar errores si es necesario
          console.error("Error al obtener la URL de descarga:", error);
        });
    });
  }

  useEffect(() => {
    setImageUpload(file);
  }, [file]);

  return (
    <div /* className={styles.adminContainer} */>
      {/* <NavBar /> */}
      <button onClick={uploadImage}>Upload</button>
    </div>
  );
}
