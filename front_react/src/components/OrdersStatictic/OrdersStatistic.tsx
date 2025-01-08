import { FC } from 'react';

import IOrdersStatusStatistic from '../../interfaces/IOrdersStatusStatistic';
import GridCell from '../GridCell/GridCell';

import styles from './OrdersStatistic.module.css';

interface IProps {
  label: string;
  statistic: IOrdersStatusStatistic | null;
}

const OrdersStatistic: FC<IProps> = ({ statistic, label }) => {

  return <div className={styles.statistic}>
    <span className={styles.label}>{label}</span>
    {!!statistic && Object.keys(statistic).map((e, i) => <GridCell key={i} cellContent={e} />)}
    {!!statistic && Object.values(statistic).map((e, i) => <GridCell key={i} cellContent={e} />)}
  </div>;

  // <Table<IOrdersStatusStatistic> items={statistic ? [statistic] : []} />;
};

export default OrdersStatistic;