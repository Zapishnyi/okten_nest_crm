import { FC, useEffect, useState } from 'react';

import { ClipLoader } from 'react-spinners';

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
  const [isPending, setIsPending] = useState(false);
  useEffect(() => {
    const getStatistic = async (): Promise<void> => {
      setIsPending(true);
      try {
        setStatistic(await CRMApi.admin.get_orders_status_statistic());
      } catch (e) {
        errorHandle(e);
      } finally {
        setIsPending(false);
      }
    };
    void getStatistic();
  }, [orders]);
  return (
    <div className={styles.admin_tools}>
      <BtnCreateUser />
      <div className={styles.statistic_container}>
        {isPending && <ClipLoader />}
        {!isPending && <OrdersStatistic statistic={statistic} />}

      </div>

    </div>);
};

export default AdminTools;