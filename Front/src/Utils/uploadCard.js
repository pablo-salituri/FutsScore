import { storage, firebaseApp } from "../Components/Firebase/credentials";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import Swal from "sweetalert2";
import { v4 } from "uuid";

export default function uploadCard(action, {ImgUrl, Description, Type, Price}) {
  const firestore = getFirestore(firebaseApp);
  // const infinitive = action === 'carga' ? 'cargar' : 'editar'
  const participle = action === 'carga' ? 'cargado' : 'editado'

  async function createInFirestore(uid, url) {
    const docuRef = doc(firestore, `Cards/${uid}`);

    setDoc(docuRef, {
      Description,
      Type,
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
        createInFirestore(name, url).then(() => Swal.fire({
          title: `Artículo ${participle} correctamente`,
          // text: "Artículo eliminado correctamente",
          icon: "success",
        }));
      })
      .catch((error) => {
        // Manejar errores si es necesario
        console.error("Error al obtener la URL de descarga:", error);
      });
  });
}
