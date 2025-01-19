import React, { FC, MouseEvent } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';

import { initialOrdersQuery } from '../../constants/initialOrdersQuery';
import { initialUsersQuery } from '../../constants/initialUsersQuery';
import { queryToSearchParams } from '../../helpers/query-to-search-params-obj';

import styles from './AdminMenu.module.css';

const AdminMenu: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const clickHandle = (event: MouseEvent<HTMLLIElement>) => {

    switch (event.currentTarget.classList.value) {
      case styles.orders : {
        const searchParams = new URLSearchParams(queryToSearchParams(initialOrdersQuery));
        navigate(`/orders?${searchParams}`);
        break;
      }
      case styles.managers : {
        const searchParams = new URLSearchParams(queryToSearchParams(initialUsersQuery));
        navigate(`/admin?${searchParams}`);
        break;
      }
    }
  };

  return (
    <div className={styles.menu}>
      <ul>
        <li className={styles.orders} onClick={clickHandle}><span>Orders</span></li>
        <li className={styles.managers} onClick={clickHandle}><span>Managers</span></li>
      </ul>
      <div
        className={[styles.underline, location.pathname === '/orders' ? '' : styles.under_managers].join(' ')}></div>
    </div>
  );
};

export default AdminMenu;