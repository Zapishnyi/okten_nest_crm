import React, { BaseSyntheticEvent, FC, memo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import TitleRowCell from '../../components/TableTitleIRowCell/TitleRowCell';
import BodyRow from '../../components/TableBodyRow/BodyRow';
import styles from './Orders.module.css';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { initialQuery } from '../../constants/initialQuery';
import { queryToSearchParams } from '../../helpers/query-to-search-params-obj';
import { OrdersActions } from '../../redux/Slices/ordersSlice';
import IFormData from '../../interfaces/IOrderFormData';
import { useForm } from 'react-hook-form';


const Orders: FC = memo(() => {
  console.log('.');
  const { orders } = useAppSelector((state) => state.orders);
  const dispatch = useAppDispatch();
  const [query, setQuery] = useSearchParams(queryToSearchParams(initialQuery));

  const titles = orders.length ? Object.keys(orders[0]) : [];


  useEffect(() => {
    dispatch(OrdersActions.searchForOrders(Object.fromEntries(query.entries())));
  }, [query]);

  const search = (formData: IFormData, event?: BaseSyntheticEvent) => {
    const queryObject = Object.fromEntries(query.entries());
    queryObject.order = formData.order ? 'DESC' : 'ASC';
    queryObject.orderBy = formData.orderBy;
    console.log('FormData:', formData);
    console.log('FormData queryObject:', queryObject);
    setQuery(queryObject);

  };


  const { register, handleSubmit } = useForm<IFormData>({
    defaultValues: { orderBy: 'id', order: false },
  });

  const clickHandle = (action: boolean) => {
    const queryObject = Object.fromEntries(query.entries());
    queryObject.page = (action ? +queryObject.page + 1 : +queryObject.page - 1).toString();
    setQuery(queryObject);
  };
  const formSubmit = handleSubmit(search);

  return (
    <div>
      {titles.length &&
        <form id={'searchForm'}>
          <input id={'order'} type="checkbox" {...register('order')} />
          <table className={styles.table} border={1}>
            <thead>
            <tr>
              {titles.map((e, i) => <TitleRowCell key={i} cellName={e}
                                                  formSubmit={formSubmit}
                                                  register={register} />)}
            </tr>
            </thead>
            <tbody>
            {orders && orders.map((order, i) => <BodyRow key={i} order={order} />)}
            </tbody>

          </table>
        </form>
      }


      <button onClick={
        () => {
          clickHandle(true);
        }}>+ Plus
      </button>
      <button onClick={() => {
        clickHandle(false);
      }}>- Minus
      </button>
    </div>
  );
});

export default Orders;