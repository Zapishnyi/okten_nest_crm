import React, { ChangeEvent, FC, memo, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import TitleRowCell from '../../components/TableTitleIRowCell/TitleRowCell';
import BodyRow from '../../components/TableBodyRow/BodyRow';
import styles from './Orders.module.css';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { initialQuery } from '../../constants/initialQuery';
import { queryToSearchParams } from '../../helpers/query-to-search-params-obj';
import { OrdersActions } from '../../redux/Slices/ordersSlice';
import { QueryActions } from '../../redux/Slices/querySlice';
import Pagination from '../../components/Pagination/Pagination';


const Orders: FC = memo(() => {
  console.log('.');
  const { orders } = useAppSelector((state) => state.orders);
  const { pages, page, total, limit } = useAppSelector((state) => state.pagination.paginationData);
  const { orderQuery } = useAppSelector((state) => state.orderQuery);

  const dispatch = useAppDispatch();
  const chosenColumnRef = useRef<string>('id');
  const [query, setQuery] = useSearchParams(queryToSearchParams(initialQuery));
  const titles = orders.length ? Object.keys(orders[0]) : [];

  useEffect(() => {
    // Sync initial parameters to the URL if they are not already there
    setQuery(queryToSearchParams(initialQuery));
  }, []);

  useEffect(() => {
    setQuery(queryToSearchParams(orderQuery));
    dispatch(OrdersActions.searchForOrders(Object.fromEntries(query.entries())));
  }, [orderQuery]);

  const clickHandle = (action: boolean) => {
    dispatch(QueryActions.setQuery({
      ...orderQuery,
      page: action ? orderQuery.page + 1 : orderQuery.page - 1,
    }));
  };

  const pageChange = (event: ChangeEvent<unknown>, value: number) => {
    dispatch(QueryActions.setQuery({
      ...orderQuery,
      page: value,
    }));
  };
  return (
    <div>
      {titles.length &&
        <form id={'searchForm'}>
          <table className={styles.table} border={1}>
            <thead>
            <tr>
              {titles.map((e, i) => <TitleRowCell key={i} cellName={e}
                                                  setQuery={setQuery} chosenColumnRef={chosenColumnRef} />)}

            </tr>
            </thead>
            <tbody>
            {orders && orders.map((order, i) => <BodyRow key={i} order={order} />)}
            </tbody>

          </table>
        </form>
      }

      <Pagination page={pages} pages={pages} total={total} limit={limit} />

    </div>
  );
});

export default Orders;