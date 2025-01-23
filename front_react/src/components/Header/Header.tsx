import { FC, memo } from 'react';

import { useLocation } from 'react-router-dom';

import { UserRoleEnum } from '../../enums/user-role.enum';
import OrderFilterForm from '../../forms/OrderFilterForm/OrderFilterForm';
import { useAppSelector } from '../../redux/store';
import AdminMenu from '../AdminMenu/AdminMenu';
import AdminTools from '../AdminTools/AdminTools';
import Logo from '../Logo/Logo';
import UserMenu from '../UserMenu/UserMenu';

import styles from './Header.module.css';


const Header: FC = memo(() => {
  const location = useLocation();


  const { userLogged } = useAppSelector((state) => state.users);

  return (
    <header className={styles.base}>
      <div className={styles.container}>
        <Logo />
        <div className={styles.toolbox}>
          {(location.pathname === '/admin') && userLogged?.role === UserRoleEnum.ADMIN && <AdminTools />
          }
          {(location.pathname === '/orders') && <OrderFilterForm />
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