import { NavLink } from "react-router-dom";
import styles from "./AppNav.module.css";

function AppNav ()
{
  // console.log('AppNav');

  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <NavLink to="cities">Города</NavLink>
        </li>
        <li>
          <NavLink to="countries">Страны</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default AppNav;
