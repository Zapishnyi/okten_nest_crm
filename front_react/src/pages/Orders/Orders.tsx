import React, { FC, memo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import styles from './Orders.module.css';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { initialOrdersQuery } from '../../constants/initialOrdersQuery';
import { queryToSearchParams } from '../../helpers/query-to-search-params-obj';
import { OrdersActions } from '../../redux/Slices/ordersSlice';
import Table from '../../components/Table/Table';
import { orderToReduced } from '../../helpers/order-to-reduced';
import { TableTypeEnum } from '../../enums/table-type.enum';
import Pagination from '../../components/Pagination/Pagination';


const Orders: FC = memo(() => {
  console.log('.');
  const { orders } = useAppSelector((state) => state.orders);
  const { pages, page } = useAppSelector((state) => state.pagination.paginationData);
  const dispatch = useAppDispatch();
  const [query, setQuery] = useSearchParams(queryToSearchParams(initialOrdersQuery));
  useEffect(() => {
    //Initial sync initial parameters to the URL
    if (!orders.length) {
      setQuery(queryToSearchParams(initialOrdersQuery));
    }

  }, []);

  useEffect(() => {
    dispatch(OrdersActions.searchForOrders(Object.fromEntries(query.entries())));
  }, [query.toString()]);
  return (
    <div className={styles.wrapper}>
      {!!orders.length && <>
        <Table items={orders.map(order => orderToReduced(order))} table_type={TableTypeEnum.ORDER} />
        <Pagination page={page} pages={pages} />
      </>
      }
    </div>
  );
});

export default Orders;