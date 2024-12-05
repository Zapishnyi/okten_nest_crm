import React, { useEffect, useState } from 'react';
import { CRMApi } from '../services/crm.api.servise';
import IOrderQuery from '../interfaces/IOrderQuery';
import { OrderEnum } from '../enums/order.enum';
import { OrderByEnum } from '../enums/order-by.enum';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AxiosError } from 'axios';
import IOrderPaginated from '../interfaces/IOrderPaginated';

interface IOrderQueryString {
  page: string,
  order: string,
  orderBy: string,
}

const Orders = () => {
  const [page, setPage] = useState<number>(1);
  const navigate = useNavigate();
  const initial: IOrderQuery = {
    page: page,
    order: OrderEnum.DESC,
    orderBy: OrderByEnum.ID,
  };

  const queryMapper = (query: IOrderQuery) => ({
    page: query.page.toString(),
    order: query.order.toString(),
    orderBy: query.orderBy.toString(),
  });
  const [query, setQuery] = useSearchParams(queryMapper(initial));
  const [ordersPaginated, setOrdersPaginated] = useState<IOrderPaginated | null>(null);

  console.log('query:', query);
  useEffect(() => {
    setQuery(queryMapper({ ...initial, page }));
    const getData = async () => {
      try {
        console.log('heppened');
        const orders = await CRMApi.orders.get(query.toString());
        setOrdersPaginated(orders);

      } catch (e) {
        const error = e as AxiosError;
        console.log(error.message);
        if (error.status === 401) navigate('/sing-in');
      }
    };


  }, [page]);
  console.log('ordersPaginated - ', ordersPaginated);
  return (
    <div>
      <p>Orders {' '}</p>
      <button onClick={() => {
        setPage((current) => ++current);
      }}>+ Plus
      </button>
      <button onClick={() => {
        setPage((current) => --current);
      }}>- Minus
      </button>
    </div>
  );
};

export default Orders;