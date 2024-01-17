import NavBar from "./Components/NavBar/NavBar";
import SideBar from "./Components/SideBar/SideBar";
import Home from "./Components/Home/Home";
import Footer from "./Components/Footer/Footer";
import styles from "./App.module.css";

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
