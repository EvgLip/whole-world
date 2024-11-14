//PageNav
import { NavLink } from 'react-router-dom';
import style from './PageNav.module.css';

export default function PageNav ()
{
  return (
    <nav className={style.nav}>
      <ul>
        <li>
          <NavLink to="/">Главная</NavLink>
        </li>
        <li>
          <NavLink to="/product">Продукты</NavLink>
        </li>
        <li>
          <NavLink to="/pricing">Цены</NavLink>
        </li>
      </ul>
    </nav>
  );
}
