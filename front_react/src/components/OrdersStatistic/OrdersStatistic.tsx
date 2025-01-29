import { FC } from "react";

import IOrdersStatusStatistic from "../../interfaces/IOrdersStatusStatistic";
import StatisticCell from "../StatisticCell/StatisticCell";

import styles from "./OrdersStatistic.module.css";

interface IProps {
  statistic: IOrdersStatusStatistic | null;
}

const OrdersStatistic: FC<IProps> = ({ statistic }) => {
  let titles: string[] = [];
  let values: string[] = [];
  if (statistic) {
    titles = Object.keys(statistic).sort();
    titles.unshift("Status");
    values = Object.keys(statistic)
      .sort()
      .map((e) => statistic[e].toString());
    values.unshift("Statistic");
  }

  return (
    <div className={styles.statistic}>
      {titles.map((e, i) => (
        <StatisticCell key={i} cellContent={e} />
      ))}
      {values.map((e, i) => (
        <StatisticCell key={i} cellContent={e} />
      ))}
    </div>
  );
};

export default OrdersStatistic;
