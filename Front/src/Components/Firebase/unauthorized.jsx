import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { RiProhibitedLine } from "react-icons/ri";
import styles from "./unauthorized.module.css";

const Unauthorized = () => {
  const navigate = useNavigate();

  useEffect(() => {
    let seconds = 5;

    const timeout = setInterval(() => {
      document.getElementById("countdown").innerText = seconds;
      seconds--;

      if (seconds < 0) {
        navigate("/");
        clearInterval(timeout);
      }
    }, 1000);

    return () => clearInterval(timeout);
  }, []);

  return (
    <div className={styles.unauthorizedContainer}>
      <div className={styles.iconContainer}>
        <RiProhibitedLine className={styles.icon} />
      </div>
      <p className={styles.unauthorized}>
        No estás autorizado para ingresar aquí
      </p>
      <h3>
        Serás redirigido en <span id="countdown">5</span> segundos
      </h3>
    </div>
  );
};

export default Unauthorized;
