import { useEffect, useState } from "react";
import Card from "../Card/Card";
import { firebaseApp } from "../Firebase/credentials";
import { getDocs, collection, getFirestore } from "firebase/firestore";
import deleteRecordFS from "../../Utils/deleteRecordFS";
import deleteImage from "../../Utils/deleteImage";
import styles from "./Home.module.css";

const firestore = getFirestore(firebaseApp);

export default function Home() {
  const [cardList, setCardList] = useState([]);

  async function getDataFromFirestore() {
    const querySnapshot = await getDocs(collection(firestore, "Cards"));
    const newData = querySnapshot.docs.map((doc) => {
      return {
        data: doc.data(),
        id: doc.id,
      };
    });
    setCardList(newData);
  }

  function handleDeleteCard(uid) {
    deleteImage(uid);
    deleteRecordFS(uid);
  }

  useEffect(() => {
    getDataFromFirestore();
  }, []);

  return (
    <div className={styles.homeContainer}>
      {/* {data.map((elem) => (
        <React.Fragment key={elem.id}>
          <Card parameters={elem} />
        </React.Fragment>
      ))} */}
      {cardList.map((card) => (
        // <React.Fragment key={card.ImgUrl}>
        <section key={card.data.ImgUrl} className={styles.cardContainerInHome}>
          <Card parameters={card} handleDeleteCard={handleDeleteCard} />
        </section>
        // </React.Fragment>
        // <img key={picture.ImgUrl} src={picture.ImgUrl} alt="some-description" />
      ))}
    </div>
  );
}
