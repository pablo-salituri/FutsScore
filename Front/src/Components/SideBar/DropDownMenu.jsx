import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { handleSportFilter } from "../../Redux/actions";
import PriceFilter from "../Filter/PriceFilter";
import styles from "./DropDownMenu.module.css";

export default function DropDownMenu({ x, y, showDropDown }) {
  const dropDownContainerRef = useRef(null);
  const location = useLocation().pathname === "/" ? "Home" : "Not Home";
  const dispatch = useDispatch();

  const filter = useSelector((state) =>
    location === "Home" ? state.publicFilter : state.adminFilter
  );

  const [position, setPosition] = useState({ left: parseInt(x, 10), top: y });
  const [containerWidth, setContainerWidth] = useState(null);

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
      {showDropDown === "type" ? (
        //********************  Filtro por Deporte ********************
        <table>
          <tbody>
            {Object.entries(filter.sports).map(([sportName, value]) => {
              const sanitizedSportName = sportName.includes("_")
                ? sportName.replace(/_/g, " ")
                : sportName;

              return (
                <tr
                  key={sportName}
                  onClick={() =>
                    dispatch(handleSportFilter(location, sportName))
                  }
                >
                  <td>{sanitizedSportName}</td>
                  <td>{value ? "✔" : ""}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        //********************  Filtro por Precio ********************
        <>
          <PriceFilter />
        </>
      )}
    </div>
  );
}
