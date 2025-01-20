import React, { FC, memo, useEffect } from 'react';

import { useLocation, useSearchParams } from 'react-router-dom';

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
  const location = useLocation();

  const { orders } = useAppSelector((state) => state.orders);
  const { pages, page } = useAppSelector((state) => state.pagination.paginationData);
  const dispatch = useAppDispatch();
  const [query, setQuery] = useSearchParams(queryToSearchParams(initialOrdersQuery));
  useEffect(() => {
    //Initial sync initial parameters to the URL
    if (!location.search) {
      setQuery(queryToSearchParams(initialOrdersQuery), { replace: true });
    }
  }, [dispatch]);

  useEffect(() => {
    dispatch(OrdersActions.searchForOrders(Object.fromEntries(query.entries())));
  }, [query.toString()]);
  return (
    <div className={styles.wrapper}>
      {!!orders.length &&
        <div className={styles.table_container}>
          <Table<IOrderReduced> items={orders.map(order => orderToReduced(order))} />
          <Pagination page={page} pages={pages} />
        </div>
      }
      {!orders.length && <h2 className={styles.no_data}>No data matches your request.</h2>}
    </div>
  );
});

export default Orders;