import React, { FC, useRef } from 'react';
import HeadRowCell from '../TableHeadIRowCell/HeadRowCell';
import BodyRow from '../TableBodyRow/BodyRow';
import styles from './Table.module.css';
import { orderToReduced } from '../../helpers/order-to-reduced';
import { useAppSelector } from '../../redux/store';

const Table: FC = () => {
  const { orders } = useAppSelector((state) => state.orders);
  const chosenColumnRef = useRef<string>('id');
  const titles = orders.length ? Object.keys(orderToReduced(orders[0])) : [];
  return (
    <table className={styles.table} border={1}>
      <thead>
      <tr>
        {titles.map((e, i) => <HeadRowCell key={i} cellName={e}
                                           chosenColumnRef={chosenColumnRef} />)}
      </tr>
      </thead>
      <tbody>
      {orders && orders.map((order, i) => <BodyRow key={i} order={order} />)}
      </tbody>
    </table>
  );
};

export default Table;