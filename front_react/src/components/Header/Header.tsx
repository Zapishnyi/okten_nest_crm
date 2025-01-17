import React, { FC, memo } from 'react';

import { useLocation } from 'react-router-dom';

import { UserRoleEnum } from '../../enums/user-role.enum';
import { useAppSelector } from '../../redux/store';
import AdminMenu from '../AdminMenu/AdminMenu';
import AdminTools from '../AdminTools/AdminTools';
import Logo from '../Logo/Logo';
import UserMenu from '../UserMenu/UserMenu';

import styles from './Header.module.css';


const Header: FC = memo(() => {
  const location = useLocation();
  // console.log('.');
  const { userLogged } = useAppSelector((state) => state.users);

  return (
    <header className={styles.base}>
      <div className={styles.container}>
        <Logo />
        <div className={styles.toolbox}>
          {location.pathname?.includes('/admin') && userLogged?.role === UserRoleEnum.ADMIN && <AdminTools />
          }
          {location.pathname?.includes('/order') && userLogged?.role === UserRoleEnum.ADMIN && <AdminTools />
          }
        </div>
        {userLogged?.role === UserRoleEnum.ADMIN &&
          <AdminMenu />}
        <UserMenu />
      </div>

    </header>
  );
});

export default Header;