import { NavLink } from "react-router-dom";
import Logo from "./Logo";
import styles from "./PageNav.module.css";

function PageNav ()
{
  return (
    <nav className={styles.nav}>
      <Logo />
      <ul>
        <li>
          <NavLink to="/pricing">Цены</NavLink>
        </li>
        <li>
          <NavLink to="/product">О проекте</NavLink>
        </li>
        <li>
          <NavLink to="/login" className={styles.ctaLink}>
            Вход
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default PageNav;
