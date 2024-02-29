import { Link, useLocation, useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { firebaseApp } from "../Firebase/credentials";
import logo from "../../assets/Logo.png";
import Swal from "sweetalert2";
import styles from "./Navbar.module.css";

const auth = getAuth(firebaseApp);

export default function NavBar() {
  const location = useLocation().pathname;
  const navigate = useNavigate();

  async function handleLogOut() {
    Swal.fire({
      title: "¿Cerrar sesión",
      // text:
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar",
      allowOutsideClick: false,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await signOut(auth);
          navigate("/");
        } catch (error) {
          Swal.fire({
            title: "Error al cerrar sesión",
            // text: "Error al eliminar el artículo",
            icon: "error",
          });
        }
      }
    });
  }

  return (
    <div className={styles.navBarContainer}>
      <section className={styles.leftSection}>
        <img className={styles.img} src={logo} alt="logo" />
      </section>

      <section className={styles.middleSection}>
        <span className={styles.title}>FutsScore</span>
      </section>

      <section className={styles.rightSection}>
        {location === "/" ? (
          <Link to="/login">
            <span className={styles.button}>Login</span>
          </Link>
        ) : (
          <span className={styles.button} onClick={() => handleLogOut()}>
            Logout
          </span>
        )}
      </section>
    </div>
  );
}
