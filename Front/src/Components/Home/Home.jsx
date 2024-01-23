import { /* React, */ useEffect, useState } from "react";
/* import data from "./data";
import Card from "../Card/Card"; */
import { /* storage, */ firebaseApp } from "../Firebase/credentials";
// import { ref, listAll, getDownloadURL } from "firebase/storage";
import { getDocs, collection, getFirestore } from "firebase/firestore";
import styles from "./Home.module.css";

const firestore = getFirestore(firebaseApp);

export default function Home() {
  const [imageList, setImageList] = useState([]);

  // const imageListRef = ref(storage, "images/");

  async function getDataFromFirestore() {
    const querySnapshot = await getDocs(collection(firestore, "Cards"));
    querySnapshot.forEach((doc) => {
      console.log(doc.data());
      setImageList((prev) => [...prev, doc.data()]);
    });
  }

  useEffect(() => {
    /* listAll(imageListRef).then((response) => {
      response.items.forEach((item) =>
        getDownloadURL(item).then((url) =>
          setImageList((prev) => [...prev, url])
        )
      );
    }); */
    getDataFromFirestore();
  }, []);

  return (
    <div className={styles.homeContainer}>
      {/* {data.map((elem) => (
        <React.Fragment key={elem.id}>
          <Card parameters={elem} />
        </React.Fragment>
      ))} */}
      {imageList.map((picture) => (
        <img key={picture.ImgUrl} src={picture.ImgUrl} alt="some-description" />
      ))}
    </div>
  );
}
