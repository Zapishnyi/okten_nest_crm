import React, { FC, memo, useState } from 'react';
import styles from './Header.module.css';
import UsersBtn from '../UsersBtn/UsersBtn';
import OrdersBtn from '../OrdersBtn/OrdersBtn';
import { UserRoleEnum } from '../../enums/user-role.enum';
import { useAppSelector } from '../../redux/store';
import UserMenu from '../UserMenu/UserMenu';
import { useLocation } from 'react-router-dom';
import CreateUserBtn from '../CreateUserBtn/CreateUserBtn';
import Logo from '../Logo/Logo';
import CreateUserForm from '../../forms/CreateUserForm/CreateUserForm';


const Header: FC = memo(() => {
  const location = useLocation();
  console.log('.');
  const { userLogged } = useAppSelector((state) => state.users);
  const [createUserFormVisible, setCreateUserFormVisible] = useState<boolean>(false);
  return (
    <header className={styles.base}>
      <div className={styles.container}>
        <Logo />
        <div className={styles.toolbox}>
          {location.pathname?.includes('/admin') &&
            <CreateUserBtn setCreateUserFormVisible={setCreateUserFormVisible} />}
        </div>
        <ul className={styles.menu}>
          {userLogged?.role === UserRoleEnum.ADMIN &&
            <>
              <li><OrdersBtn /></li>
              <li><UsersBtn /></li>
            </>}

        </ul>
        <UserMenu />
      </div>
      {createUserFormVisible && <CreateUserForm setCreateUserFormVisible={setCreateUserFormVisible} />}
    </header>
  );
});

export default Header;