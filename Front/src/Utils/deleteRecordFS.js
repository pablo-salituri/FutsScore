import { firebaseApp } from "../Components/Firebase/credentials";
import {getFirestore, doc, deleteDoc} from "firebase/firestore";

const firestore = getFirestore(firebaseApp);

export default function deleteRecordFS(uid) {
  return new Promise((resolve, reject) => {

    const docRef = doc(firestore, "Cards", uid);
    deleteDoc(docRef)
      .then(() => {
        console.log("Entire Document has been deleted successfully.");
        resolve()
      })
      .catch((error) => {
        reject(error);
      });
  })
}
