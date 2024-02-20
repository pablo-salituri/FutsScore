import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import SmallSideBar from "../SideBar/SmallSideBar";
import LargeSideBar from "../SideBar/LargeSideBar";
import Home from "../Home/Home";
import { IoMdCloudUpload } from "react-icons/io";
import { AiFillTool } from "react-icons/ai";
import styles from "./Admin.module.css";

export default function Admin() {
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
    <div className={styles.adminContainer}>
      <NavBar />
      <section className={styles.body}>
        {width < 1025 ? <SmallSideBar /> : <LargeSideBar />}
        <Link to="/admin/addItem">
          <div className={styles.uploadContainer}>
            <IoMdCloudUpload className={styles.icon} />
          </div>
        </Link>
        <div className={styles.toolContainer}>
          <AiFillTool className={styles.icon} />
        </div>
        <Home />
      </section>
    </div>
  );
}
