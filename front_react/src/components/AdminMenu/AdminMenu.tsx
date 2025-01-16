import React, { FC, MouseEvent, useEffect, useState } from 'react';

import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

import { initialOrdersQuery } from '../../constants/initialOrdersQuery';
import { initialUsersQuery } from '../../constants/initialUsersQuery';
import { queryToSearchParams } from '../../helpers/query-to-search-params-obj';
import { tableReset } from '../../helpers/table-reset';

import styles from './AdminMenu.module.css';

enum ChosenMenuItemEnum {
  ORDERS = styles.orders,
  MANAGERS = styles.managers
}

const AdminMenu: FC = () => {

  const query = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [isOrdersChosen, setIsOrdersChosen] = useState<boolean>(location.pathname.includes('/orders'));
  useEffect(() => {
    switch (isOrdersChosen) {
      case true : {
        navigate('/orders');
        query[1](queryToSearchParams(initialOrdersQuery));
        tableReset();
        break;
      }
      case false : {
        navigate('/admin');
        query[1](queryToSearchParams(initialUsersQuery));
        tableReset();
        break;
      }
    }
  }, [isOrdersChosen]);
  const clickHandle = (event: MouseEvent<HTMLLIElement>) => {
    setIsOrdersChosen(event.currentTarget.classList.value === styles.orders);
  };


  return (
    <div className={styles.menu}>
      <ul>
        <li className={styles.orders} onClick={clickHandle}><span>Orders</span></li>
        <li className={styles.managers} onClick={clickHandle}><span>Managers</span></li>
      </ul>
      <div className={[styles.underline, isOrdersChosen ? '' : styles.under_managers].join(' ')}></div>
    </div>
  );
};

export default AdminMenu;