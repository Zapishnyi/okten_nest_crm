import React, { FC, memo, useEffect } from 'react';

import { useSearchParams } from 'react-router-dom';

import Pagination from '../../components/Pagination/Pagination';
import Table from '../../components/Table/Table';
import { initialOrdersQuery } from '../../constants/initialOrdersQuery';
import { orderToReduced } from '../../helpers/order-to-reduced';
import { queryToSearchParams } from '../../helpers/query-to-search-params-obj';
import IOrderReduced from '../../interfaces/IOrderReduced';
import { OrdersActions } from '../../redux/Slices/ordersSlice';
import { useAppDispatch, useAppSelector } from '../../redux/store';

import styles from './Orders.module.css';


const Orders: FC = memo(() => {
  // console.log('.');
  const { orders } = useAppSelector((state) => state.orders);
  const { pages, page } = useAppSelector((state) => state.pagination.paginationData);
  const dispatch = useAppDispatch();
  const [query, setQuery] = useSearchParams(queryToSearchParams(initialOrdersQuery));
  useEffect(() => {
    //Initial sync initial parameters to the URL
    // if (!orders.length) {
    for (const [key, value] of Object.entries(initialOrdersQuery)) {
      query.delete(key);
      if (value) {
        query.append(key, value.toString());
      }
    }
    console.log('Orders query chanhge');
    setQuery(query);
    // }
  }, []);

  useEffect(() => {
    dispatch(OrdersActions.searchForOrders(Object.fromEntries(query.entries())));
  }, [query.entries().toArray().toString()]);
  return (
    <div className={styles.wrapper}>
      {!!orders.length &&
        <div className={styles.table_container}>
          <Table<IOrderReduced> items={orders.map(order => orderToReduced(order))} />
          <Pagination page={page} pages={pages} />
        </div>
      }
    </div>
  );
});

export default Orders;