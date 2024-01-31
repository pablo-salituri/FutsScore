import { firebaseApp } from "../Components/Firebase/credentials";
import {getFirestore, doc, updateDoc} from "firebase/firestore";

const firestore = getFirestore(firebaseApp);

export default function updateRecordFS(uid, fields, newData) {
  const updates = {};
  fields.map((field) => {
    updates[field] = newData[field];
    return null;
  });
  const docRef = doc(firestore, "Cards", uid);
  updateDoc(docRef, updates)
    .then(() => {
      console.log("Updated In Firestore");
    })
    .catch((error) => {
      console.log(error);
    });
}