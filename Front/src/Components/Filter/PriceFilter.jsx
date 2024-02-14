import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { handlePriceFilter } from "../../Redux/actions";
import styles from "./PriceFilter.module.css";

export default function PriceFilter({ setShowDropDown }) {
  const dispatch = useDispatch();
  const location = useLocation().pathname === "/" ? "Home" : "Not Home";

  const filter = useSelector((state) =>
    location === "Home" ? state.publicFilter : state.adminFilter
  );

  const [inputs, setInputs] = useState({
    input1: filter.smallest,
    input2: filter.largest,
  });

  function handleInputChange(input, value) {
    const regex = /^[0-9]+$/;
    if (regex.test(value) || value === "") {
      setInputs({
        ...inputs,
        // El parseFloat es porque sino toma el contenido como string y no filtra correctamente
        [input]: value ? parseFloat(value) : "",
      });
    }
  }

  function handleSmallestLargest() {
    let smallest = null;
    let largest = null;
    if (inputs.input1 === inputs.input2) {
      largest = inputs.input1;
      smallest = inputs.input1;
    } else if (inputs.input1 > inputs.input2) {
      largest = inputs.input1;
      smallest = inputs.input2;
    } else {
      largest = inputs.input2;
      smallest = inputs.input1;
    }

    dispatch(handlePriceFilter(location, smallest, largest));
    setShowDropDown(false);
  }

  return (
    <>
      <span style={{ alignSelf: "center" }}>Desde</span>
      <input
        type="text"
        className={styles.input}
        value={inputs.input1}
        onChange={(event) => handleInputChange("input1", event.target.value)}
      />
      <span style={{ alignSelf: "center" }}>Hasta</span>
      <input
        type="text"
        className={styles.input}
        value={inputs.input2}
        onChange={(event) => handleInputChange("input2", event.target.value)}
      />
      <section className={styles.buttonSection}>
        <button
          className={styles.button}
          style={{
            backgroundColor:
              inputs.input1 === "" || inputs.input2 === ""
                ? "#73addf"
                : "#0275d8",
          }}
          onClick={() => handleSmallestLargest()}
          disabled={inputs.input1 === "" || inputs.input2 === ""}
        >
          Aplicar
        </button>
        <button
          className={styles.button}
          style={{
            backgroundColor: filter.smallest === "" ? "#d9b6b6" : "#eb7878",
          }}
          onClick={() => {
            dispatch(handlePriceFilter(location, "", ""));
            setShowDropDown(false);
          }}
          disabled={filter.smallest === ""}
        >
          Restaurar
        </button>
      </section>
    </>
  );
}
