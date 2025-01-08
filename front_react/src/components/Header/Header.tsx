import React, { FC, memo } from 'react';

import { useLocation } from 'react-router-dom';

import { UserRoleEnum } from '../../enums/user-role.enum';
import { useAppSelector } from '../../redux/store';
import AdminTools from '../AdminTools/AdminTools';
import BtnOrders from '../BtnOrders/BtnOrders';
import BtnUsers from '../BtnUsers/BtnUsers';
import Logo from '../Logo/Logo';
import UserMenu from '../UserMenu/UserMenu';

import styles from './Header.module.css';


const Header: FC = memo(() => {
  const location = useLocation();
  console.log('.');
  const { userLogged } = useAppSelector((state) => state.users);

  return (
    <header className={styles.base}>
      <div className={styles.container}>
        <Logo />
        <div className={styles.toolbox}>
          {location.pathname?.includes('/admin') && <AdminTools />
          }
        </div>
        <ul className={styles.menu}>
          {userLogged?.role === UserRoleEnum.ADMIN &&
            <>
              <li><BtnOrders /></li>
              <li><BtnUsers /></li>
            </>}

        </ul>
        <UserMenu />
      </div>

    </header>
  );
});

export default Header;