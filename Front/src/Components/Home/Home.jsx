import React, { useEffect, useState } from "react";
import data from "./data";
import Card from "../Card/Card";
import { storage } from "../Firebase/credentials";
import { ref, listAll, getDownloadURL /* , list */ } from "firebase/storage";
import styles from "./Home.module.css";

export default function Home() {
  const [imageList, setImageList] = useState([]);

  const imageListRef = ref(storage, "images/");

  useEffect(() => {
    listAll(imageListRef).then((response) => {
      response.items.forEach((item) =>
        getDownloadURL(item).then((url) =>
          setImageList((prev) => [...prev, url])
        )
      );
    });
  }, []);

  return (
    <div className={styles.homeContainer}>
      {data.map((elem) => (
        <React.Fragment key={elem.id}>
          <Card parameters={elem} />
        </React.Fragment>
      ))}
      {imageList.map((picture) => (
        <img key={picture} src={picture} alt="some-description" />
      ))}
    </div>
  );
}
