//Sidebar
import { Outlet } from 'react-router-dom';
import AppNav from './AppNav';
import Logo from './Logo';
import styles from './Sidebar.module.css';

export default function Sidebar ()
{

  // console.log('SideBar');

  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />

      <Outlet />

      <footer className={styles.footer}>
        <p className={styles.copyright}>
          &copy; Copirigth {new Date().getFullYear()} by WorldWise Inc.
        </p>
      </footer>
    </div>
  );
}
