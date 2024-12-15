import React, { FC, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import styles from './Orders.module.css';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { initialQuery } from '../../constants/initialQuery';
import { queryToSearchParams } from '../../helpers/query-to-search-params-obj';
import { OrdersActions } from '../../redux/Slices/ordersSlice';
import Pagination from '../../components/Pagination/Pagination';
import LogOut from '../../components/LogOutBtn/LogOut';
import Table from '../../components/Table/Table';


const Orders: FC = () => {
  console.log('.');
  const { orders } = useAppSelector((state) => state.orders);
  const { pages, page } = useAppSelector((state) => state.pagination.paginationData);
  const dispatch = useAppDispatch();
  const [query, setQuery] = useSearchParams(queryToSearchParams(initialQuery));

  useEffect(() => {
    //Initial sync initial parameters to the URL
    setQuery(queryToSearchParams(initialQuery));
  }, []);

  useEffect(() => {
    dispatch(OrdersActions.searchForOrders(Object.fromEntries(query.entries())));
  }, [query]);

  return (
    <div className={styles.wrapper}>
      <LogOut />
      {orders.length !== 0 && <>
        <Table />
        <Pagination page={page} pages={pages} />
      </>
      }
    </div>
  );
};

export default Orders;