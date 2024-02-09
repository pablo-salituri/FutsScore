import { useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { PiSoccerBallFill } from "react-icons/pi";
import { MdAttachMoney } from "react-icons/md";
import DropDownMenu from "./DropDownMenu";
import styles from "./SmallSideBar.module.css";

export default function SmallSideBar() {
  const location = useLocation().pathname === "/" ? "Home" : "Not Home";

  const [showDropDown, setShowDropDown] = useState(false);
  const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0 });

  const filter = useSelector((state) =>
    location === "Home" ? state.publicFilter : state.adminFilter
  );

  const isSportsFiltered = Object.values(filter.sports).some(
    (value) => value === false
  );

  const handleDropDownMenu = (event, field) => {
    setShowDropDown(showDropDown === field ? null : field);
    const buttonClicked = event.currentTarget.getBoundingClientRect();
    const x = `${buttonClicked.x + buttonClicked.width / 2}px`;
    const y = `${buttonClicked.y + buttonClicked.height}px`;
    setButtonPosition({ x, y });
  };

  return (
    <div className={styles.sideBarContainer}>
      <section
        className={styles.iconContainer}
        onClick={(event) => handleDropDownMenu(event, "type")}
        style={isSportsFiltered ? { backgroundColor: "#31cb31" } : {}}
      >
        <PiSoccerBallFill className={styles.icon} />
      </section>
      <section
        className={styles.iconContainer}
        onClick={(event) => handleDropDownMenu(event, "price")}
        style={filter.smallest !== "" ? { backgroundColor: "#31cb31" } : {}}
      >
        <MdAttachMoney className={styles.icon} />
      </section>
      {showDropDown && (
        <DropDownMenu
          x={buttonPosition.x}
          y={buttonPosition.y}
          showDropDown={showDropDown}
          setShowDropDown={setShowDropDown}
          filter={filter}
        />
      )}
    </div>
  );
}
