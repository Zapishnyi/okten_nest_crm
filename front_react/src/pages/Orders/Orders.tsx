import React, { FC, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import TitleRowCell from '../../components/TableTitleIRowCell/TitleRowCell';
import BodyRow from '../../components/TableBodyRow/BodyRow';
import styles from './Orders.module.css';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { initialQuery } from '../../constants/initialQuery';
import { queryToSearchParams } from '../../helpers/query-to-search-params-obj';
import { OrdersActions } from '../../redux/Slices/ordersSlice';
import Pagination from '../../components/Pagination/Pagination';
import LogOut from '../../components/LogOutBtn/LogOut';
import { orderToReduced } from '../../helpers/order-to-reduced';


const Orders: FC = () => {
  console.log('.');
  const { orders } = useAppSelector((state) => state.orders);
  const { pages, page } = useAppSelector((state) => state.pagination.paginationData);
  const dispatch = useAppDispatch();
  const chosenColumnRef = useRef<string>('id');
  const [query, setQuery] = useSearchParams(queryToSearchParams(initialQuery));
  const titles = orders.length ? Object.keys(orderToReduced(orders[0])) : [];
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
      {titles.length !== 0 && <>
        <table className={styles.table} border={1}>
          <thead>
          <tr>
            {titles.map((e, i) => <TitleRowCell key={i} cellName={e}
                                                chosenColumnRef={chosenColumnRef} />)}
          </tr>
          </thead>
          <tbody>
          {orders && orders.map((order, i) => <BodyRow key={i} order={order} />)}
          </tbody>
        </table>
        <Pagination page={page} pages={pages} />
      </>
      }
    </div>
  );
};

export default Orders;