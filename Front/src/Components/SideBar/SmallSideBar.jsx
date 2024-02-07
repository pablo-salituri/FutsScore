import { useState } from "react";
import { PiSoccerBallFill } from "react-icons/pi";
import { MdAttachMoney } from "react-icons/md";
import DropDownMenu from "./DropDownMenu";
import styles from "./SmallSideBar.module.css";

export default function SmallSideBar() {
  const [showDropDown, setShowDropDown] = useState(false);
  const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0 });

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
      >
        <PiSoccerBallFill className={styles.icon} />
      </section>
      <section
        className={styles.iconContainer}
        onClick={(event) => handleDropDownMenu(event, "price")}
      >
        <MdAttachMoney className={styles.icon} />
      </section>
      <span>Limpiar Filtros</span>
      {showDropDown && (
        <DropDownMenu
          x={buttonPosition.x}
          y={buttonPosition.y}
          showDropDown={showDropDown}
        />
      )}
    </div>
  );
}
