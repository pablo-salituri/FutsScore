import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Card from "../Card/Card";
import { firebaseApp } from "../Firebase/credentials";
import { getDocs, collection, getFirestore } from "firebase/firestore";
import deleteRecordFS from "../../Utils/deleteRecordFS";
import deleteImage from "../../Utils/deleteImage";
import styles from "./Home.module.css";

const firestore = getFirestore(firebaseApp);

export default function Home() {
  const location = useLocation().pathname === "/" ? "Home" : "Not Home";

  const [cardList, setCardList] = useState([]);

  const filter = useSelector((state) =>
    location === "Home" ? state.publicFilter : state.adminFilter
  );

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
  //!BREAKPOINT
  return (
    <div className={styles.homeContainer}>
      {cardList.map((card) => {
        if (
          filter.sports[card.data.Type] &&
          (filter.smallest === "" ||
            (card.data.Price >= filter.smallest &&
              card.data.Price <= filter.largest))
        )
          return (
            <section
              key={card.data.ImgUrl}
              className={styles.cardContainerInHome}
            >
              <Card parameters={card} handleDeleteCard={handleDeleteCard} />
            </section>
          );
        else return null;
      })}
    </div>
  );
}
