import React, { FC, useEffect, useState } from 'react';

import { errorHandle } from '../../helpers/error-handle';
import IOrdersStatusStatistic from '../../interfaces/IOrdersStatusStatistic';
import { useAppSelector } from '../../redux/store';
import { CRMApi } from '../../services/crm.api.servise';
import BtnCreateUser from '../BtnCreateUser/BtnCreateUser';
import OrdersStatistic from '../OrdersStatictic/OrdersStatistic';

import styles from './AdminTools.module.css';

const AdminTools: FC = () => {

  const { orders } = useAppSelector(state => state.orders);
  const [statistic, setStatistic] = useState<IOrdersStatusStatistic | null>(null);

  useEffect(() => {
    const getStatistic = async (): Promise<void> => {
      try {
        setStatistic(await CRMApi.admin.get_orders_status_statistic());
      } catch (e) {
        errorHandle(e);
      }
    };
    void getStatistic();
  }, [orders]);
  return (
    <div className={styles.admin_tools}>
      <BtnCreateUser />
      <div className={styles.statistic_container}>
        <OrdersStatistic statistic={statistic} />
      </div>

    </div>);
};

export default AdminTools;