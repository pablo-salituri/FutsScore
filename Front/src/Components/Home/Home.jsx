import React from "react";
import data from "./data";
import Card from "../Card/Card";
import styles from "./Home.module.css";

export default function Home() {
  return (
    <div className={styles.homeContainer}>
      {data.map((elem) => (
        <React.Fragment key={elem.id}>
          <Card parameters={elem} />
        </React.Fragment>
      ))}
    </div>
  );
}
