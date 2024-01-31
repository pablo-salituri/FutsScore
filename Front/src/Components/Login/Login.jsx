import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAuth,
  signInWithEmailAndPassword,
  setPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import { firebaseApp } from "../Firebase/credentials";
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
      <input
        type="text"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <input
        type="text"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      <button onClick={() => handleLogin()}>Login</button>
      <button>Volver</button>
      <span>Recuperar Contraseña</span>
    </div>
  );
}
