import { storage, firebaseApp } from "../Components/Firebase/credentials";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import Swal from "sweetalert2";
import { v4 } from "uuid";

export default function uploadCard(action, { ImgUrl, Description, Type, Price }) {
  return new Promise((resolve, reject) => {
    const firestore = getFirestore(firebaseApp);
    const infinitive = action === 'carga' ? 'cargar' : 'editar';
    const participle = action === 'carga' ? 'cargado' : 'editado';

    async function createInFirestore(uid, url) {
      const docuRef = doc(firestore, `Cards/${uid}`);
      try {
        await setDoc(docuRef, {
          Description,
          Type,
          ImgUrl: url,
          Price
        });
        resolve(true); // Resuelve la promesa con true si la operación se realiza correctamente
      } catch (error) {
        reject('Error en createInFirestore'); // Rechaza la promesa con el error si ocurre algún problema
      }
    }

    if (ImgUrl === null) return reject(new Error('ImgUrl is null')); // Rechaza la promesa si ImgUrl es null

    const name = v4();
    const imageRef = ref(storage, `images/${name}`);
    uploadBytes(imageRef, ImgUrl).then(() => {
      getDownloadURL(imageRef)
        .then((url) => {
          createInFirestore(name, url)
            .then(() => {
              Swal.fire({
                title: `Artículo ${participle} correctamente`,
                icon: "success",
              });
            })
            .catch((error) => {
              Swal.fire({
                title: `Error al ${infinitive} el artículo`,
                icon: "error",
              });
              reject(error); // Rechaza la promesa si hay un error al crear en Firestore
            });
        })
        .catch((error) => {
          Swal.fire({
            title: `Error al obtener la URL de descarga de la imagen`,
            icon: "error",
          });
          reject(error); // Rechaza la promesa si hay un error al obtener la URL de descarga
        });
    })
    .catch((error) => {
      Swal.fire({
        title: `Error al subir la imagen`,
        icon: "error",
      });
      reject(error); // Rechaza la promesa si hay un error al subir la imagen
    });
  });
}

