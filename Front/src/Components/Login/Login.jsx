import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAuth,
  signInWithEmailAndPassword,
  setPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import { firebaseApp } from "../Firebase/credentials";
import { MdLogin } from "react-icons/md";
import { FaArrowCircleLeft } from "react-icons/fa";
import styles from "./Login.module.css";

const auth = getAuth(firebaseApp);

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    // e.preventDefault();

    try {
      setPersistence(auth, browserSessionPersistence);
      /* const response =  */ await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      /* dispatch(
              handleLoginLogout({ operation: "login", uid: response.user.uid })
            ); */
      navigate("/admin");
      /* else
            Swal.fire({
              text: "Credenciales incorrectas",
              icon: "error",
              allowOutsideClick: false,
            }); */
    } catch (error) {
      console.error("Error al obtener registros:", error);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <section className={styles.backgroundContainer}></section>
      <section className={styles.opaqueContainer}>
        <input
          type="text"
          className={styles.input}
          placeholder="Mail"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <input
          type="text"
          className={styles.input}
          placeholder="Contraseña"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <button
          className={styles.button}
          /* style={{ backgroundColor: "#0275d8" }} */
          onClick={() => handleLogin()}
        >
          <MdLogin className={styles.icon} /> Acceder
        </button>
        <button
          className={styles.button}
          /* style={{ backgroundColor: "#eb7878" }} */
          onClick={() => navigate(-1)}
        >
          <FaArrowCircleLeft className={styles.icon} /> Volver
        </button>
        <span>Recuperar Contraseña</span>
      </section>
    </div>
  );
}
