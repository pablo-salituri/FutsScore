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
        onChange={(event) =>
          setInputs({
            ...inputs,
            input1: event.target.value ? parseFloat(event.target.value) : "",
          })
        }
      />
      <span style={{ alignSelf: "center" }}>Hasta</span>
      <input
        type="text"
        className={styles.input}
        value={inputs.input2}
        onChange={(event) =>
          setInputs({
            ...inputs,
            input2: event.target.value ? parseFloat(event.target.value) : "",
          })
        }
      />
      <section className={styles.buttonSection}>
        <button
          className={styles.button}
          onClick={() => handleSmallestLargest()}
        >
          Aplicar
        </button>
        <button
          className={styles.button}
          onClick={() => {
            dispatch(handlePriceFilter(location, "", ""));
            setShowDropDown(false);
          }}
        >
          Restaurar
        </button>
      </section>
    </>
  );
}
