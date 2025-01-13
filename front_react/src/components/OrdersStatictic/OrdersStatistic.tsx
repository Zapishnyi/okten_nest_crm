import { FC } from 'react';

import IOrdersStatusStatistic from '../../interfaces/IOrdersStatusStatistic';
import StatisticCell from '../StatisticCell/StatisticCell';

import styles from './OrdersStatistic.module.css';

interface IProps {
  statistic: IOrdersStatusStatistic | null;
}

const OrdersStatistic: FC<IProps> = ({ statistic }) => {
  let titles: string[] = [];
  let values: string[] = [];
  if (statistic) {
    titles = Object.keys(statistic);
    titles.unshift('Status');
    values = Object.values(statistic);
    values.unshift('Statistic');
  }

  return <div className={styles.statistic}>
    {titles.map((e, i) => <StatisticCell key={i} cellContent={e} />)}
    {values.map((e, i) => <StatisticCell key={i} cellContent={e} />)}
  </div>;

  // <Table<IOrdersStatusStatistic> items={statistic ? [statistic] : []} />;
};

export default OrdersStatistic;