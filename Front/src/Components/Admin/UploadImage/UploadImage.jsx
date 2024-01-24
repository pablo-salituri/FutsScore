import { useState } from "react";
import { storage, firebaseApp } from "../../Firebase/credentials";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { v4 } from "uuid";
// import NavBar from "../NavBar/NavBar";
/* import styles from "./Admin.module.css"; */

export default function UploadImage() {
  const firestore = getFirestore(firebaseApp);

  const [imageUpload, setImageUpload] = useState(null);

  async function createInFirestore(uid, url) {
    const docuRef = doc(firestore, `Cards/${uid}`);

    setDoc(docuRef, {
      Description: "uploaded",
      ImgUrl: url,
      Price: 1278,
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

  return (
    <div /* className={styles.adminContainer} */>
      {/* <NavBar /> */}
      <input
        type="file"
        onChange={(event) => {
          setImageUpload(event.target.files[0]);
        }}
      />
      <button onClick={uploadImage}>Upload</button>
    </div>
  );
}
