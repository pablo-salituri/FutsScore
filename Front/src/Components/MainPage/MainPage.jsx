import { useEffect, useState } from "react";
import NavBar from "../NavBar/NavBar";
import SmallSideBar from "../SideBar/SmallSideBar";
import LargeSideBar from "../SideBar/LargeSideBar";
import Home from "../Home/Home";
import Footer from "../Footer/Footer";
import styles from "./MainPage.module.css";

export default function App() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className={styles.mainContainer}>
      { width < 1025 && <div className={styles.headerBackground}>A</div>}
      <NavBar />
      <section className={styles.body}>
        {width < 1025 ? <SmallSideBar /> : <LargeSideBar />}
        <Home />
      </section>
      <Footer />
    </div>
  );
}
