import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import NavBar from "../../NavBar/NavBar";
import EditableCard from "../../Card/EditableCard/EditableCard";
import { firebaseApp } from "../../Firebase/credentials";
import { getFirestore, getDoc, doc } from "firebase/firestore";
import styles from "./EditItem.module.css";

const firestore = getFirestore(firebaseApp);

export default function EditItem() {
  const { id } = useParams();

  const [cardInfo, setCardInfo] = useState({ data: null });

  useEffect(() => {
    async function getData(uid) {
      const docuRef = doc(firestore, `Cards/${uid}`);
      const docuCifrada = await getDoc(docuRef);
      const finalInfo = docuCifrada.data();
      setCardInfo({ data: finalInfo, id: uid });
    }

    getData(id);
  }, []);

  return (
    <div className={styles.editItemContainer}>
      <div className={styles.editItemOuter}>
        <div className={styles.editItemInner}>
          <h2 style={{ textAlign: "center" }}>Editar artículo</h2>
          <div className={styles.cardContainerInEdit}>
            {/* <NavBar /> */}
            {cardInfo.data && <EditableCard parameters={cardInfo} />}
          </div>
        </div>
      </div>
    </div>
  );
}
