import { storage, firebaseApp } from "../Components/Firebase/credentials";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { v4 } from "uuid";

export default function uploadCard({ImgUrl, Description, Price}) {
  const firestore = getFirestore(firebaseApp);

  async function createInFirestore(uid, url) {
    const docuRef = doc(firestore, `Cards/${uid}`);

    setDoc(docuRef, {
      Description,
      ImgUrl: url,
      Price
    });
  }

  if (ImgUrl === null) return;
  const name = v4();
  const imageRef = ref(storage, `images/${name}`);
  uploadBytes(imageRef, ImgUrl).then(() => {
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
