import { storage } from "../Components/Firebase/credentials";
import { ref, deleteObject } from "firebase/storage";

export default function uploadImage(originalPicId ) {

  const desertRef = ref(storage, `images/${originalPicId}`);
    deleteObject(desertRef)
      .then(() => {
        console.log("Imagen borrada con exito de Storage");
      })
      .catch((error) => {
        console.log(error);
      });
}
