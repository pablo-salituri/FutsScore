import { storage } from "../Components/Firebase/credentials";
import { ref, deleteObject } from "firebase/storage";

export default function uploadImage(originalPicId ) {
  return new Promise((resolve, reject) => {

    const desertRef = ref(storage, `images/${originalPicId}`);
      deleteObject(desertRef)
        .then(() => {
          console.log("Imagen borrada con exito de Storage");
          resolve()
        })
        .catch((error) => {
          reject(error);
        });
  })
}
