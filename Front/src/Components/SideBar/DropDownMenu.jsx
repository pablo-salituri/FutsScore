import { useState, useRef, useEffect } from "react";
import PriceFilter from "../Filter/PriceFilter";
import styles from "./DropDownMenu.module.css";

export default function DropDownMenu({
  x,
  y,
  showDropDown,
  // logged,
  // handleDropDownMenu,
  // handleLogOut,
}) {
  const [position, setPosition] = useState({ left: parseInt(x, 10), top: y });
  const [containerWidth, setContainerWidth] = useState(null);
  const dropDownContainerRef = useRef(null);

  const sports = ["allSoprts", "Fútbol 5", "Fútbol 11", "Tenis"];

  useEffect(() => {
    setPosition({ left: parseInt(x, 10), top: y });
    if (dropDownContainerRef.current) {
      const width = dropDownContainerRef.current.offsetWidth;
      setContainerWidth(width);
    }
  }, [x, y]);

  return (
    <div
      ref={dropDownContainerRef}
      className={styles.dropDownContainer}
      style={{
        left: position.left - containerWidth / 2,
        top: position.top,
        zIndex: "3",
      }}
    >
      {/* <ul className={styles.list}> */}
      {showDropDown === "type" ? (
        //********************  Filtro por Deporte ********************
        <table>
          <tbody>
            {sports.map((sport) => (
              <tr key={sport}>
                <td>{sport}</td> <td>ok</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        //********************  Filtro por Precio ********************
        <>
          <PriceFilter />
        </>
      )}

      {/* <li>Hola</li>
      <li>Hola</li>
      <li>Hola</li>
      <li>Hola</li> */}
      {/* <hr className={styles.separator} />
        {logged ? (
          <>
            <li>
              <Link
                to="/admin"
                className="nav-link"
                onClick={handleDropDownMenu}
              >
                Panel de Admin
              </Link>
            </li>
            <hr className={styles.separator} />
            <li onClick={() => handleLogOut()}>Logout</li>
          </>
        ) : (
          <li>
            <Link className="nav-link" to="/login" onClick={handleDropDownMenu}>
              Login
            </Link>
          </li> 
        )}*/}
      {/* </ul> */}
    </div>
  );
}
