import { useSelector, useDispatch } from "react-redux";
import { useLocation, Link } from "react-router-dom";
import PriceFilter from "../Filter/PriceFilter";
import { handleSportFilter } from "../../Redux/actions";
import styles from "./LargeSideBar.module.css";

export default function LargeSideBar() {
  const dispatch = useDispatch();
  const location = useLocation().pathname === "/" ? "Home" : "Not Home";

  const filter = useSelector((state) =>
    location === "Home" ? state.publicFilter : state.adminFilter
  );

  return (
    <div className={styles.sideBarContainer}>
      <section className={styles.filterSection}>
        <table className={styles.filterContainer}>
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
                  <input type="checkbox" checked={value} />
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
      <section className={styles.priceFilterInSideBar}>
        <PriceFilter />
      </section>
      {location === "Not Home" && (
        <section className={styles.tools}>
          <Link to="/admin/addItem" style={{ display: "contents" }}>
            <button className={styles.button}>Cargar Ítem</button>
          </Link>
          <Link to="/admin/AdminTools" style={{ display: "contents" }}>
            <button className={styles.button}>Configuración</button>
          </Link>
        </section>
      )}
    </div>
  );
}
