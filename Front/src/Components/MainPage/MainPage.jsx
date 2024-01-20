import NavBar from "../NavBar/NavBar";
import SideBar from "../SideBar/SideBar";
import Home from "../Home/Home";
import Footer from "../Footer/Footer";
import styles from "./MainPage.module.css";

export default function App() {
  return (
    <div className={styles.mainContainer}>
      <NavBar />
      <section className={styles.body}>
        <SideBar />
        <Home />
      </section>
      <Footer />
    </div>
  );
}
