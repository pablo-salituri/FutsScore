import PriceFilter from "../Filter/PriceFilter";
import styles from "./LargeSideBar.module.css";

export default function SideBar() {
  return (
    <div className={styles.sideBarContainer}>
      <section>
        <table>
          <tbody>
            <tr>
              <td>Fútbol 11</td>
              <td>
                <input type="checkbox" checked={true} />
              </td>
            </tr>
            <tr>
              <td>Fútbol 5</td>
              <td>
                <input type="checkbox" checked={true} />
              </td>
            </tr>
            <tr>
              <td>Tenis</td>
              <td>
                <input type="checkbox" checked={true} />
              </td>
            </tr>
          </tbody>
        </table>
      </section>
      <section>
        <PriceFilter />
      </section>
    </div>
  );
}
