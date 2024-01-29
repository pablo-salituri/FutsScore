import { storage } from "../Components/Firebase/credentials";
import { ref, deleteObject } from "firebase/storage";

export default function uploadImage(originalPicId ) {

  const desertRef = ref(storage, `images/${originalPicId}`);
    deleteObject(desertRef)
      .then(() => {
        console.log("borado con exito");
      })
      .catch((error) => {
        console.log(error);
      });
}
