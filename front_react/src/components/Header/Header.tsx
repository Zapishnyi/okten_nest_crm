import React, { FC } from 'react';
import styles from './Header.module.css';
import Logo from '../Logo/Logo';
import LogOut from '../LogOutBtn/LogOut';
import SearchBtn from '../SearchBtn/SearchBtn';
import AdministratorBtn from '../AdministratorBtn/AdministratorBtn';
import OrdersBtn from '../OrdersBtn/OrdersBtn';
import { useAppSelector } from '../../redux/store';
import { UserRoleEnum } from '../../enums/user-role.enum';


const Header: FC = () => {
  const { user } = useAppSelector((state) => state.user);
  return (
    <header className={styles.base}>
      <div className={styles.container}>
        <div className={styles.logo}><Logo /></div>
        <ul className={styles.menu}>
          <li><OrdersBtn /></li>
          {user?.role === UserRoleEnum.ADMIN && <li><AdministratorBtn /></li>}
          <li><SearchBtn /></li>
          <li><LogOut /></li>
        </ul>
      </div>
    </header>
  );
};

export default Header;