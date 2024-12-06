import React, { FC, useEffect, useState } from 'react';
import { CRMApi } from '../services/crm.api.servise';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AxiosError } from 'axios';
import IOrderPaginated from '../interfaces/IOrderPaginated';


const Orders: FC = () => {
  console.log('.');
  const navigate = useNavigate();
  const [query, setQuery] = useSearchParams({
    page: '1',
    order: 'DESC',
    orderBy: 'id',
  });
  const [ordersPaginated, setOrdersPaginated] = useState<IOrderPaginated | null>(null);
  const queryObject = Object.fromEntries(query.entries());

  useEffect(() => {
    const getData = async () => {
      try {
        const orders = await CRMApi.orders.get(queryObject);
        setOrdersPaginated(orders);
      } catch (e) {
        const error = e as AxiosError;
        console.log(error.message);
        if (error.status === 401) navigate('/sing-in');
      }
    };
    void getData();
  }, [query]);

  const clickHandle = (action: boolean) => {
    let page = +(query.get('page') || '1');
    queryObject.page = (action ? ++page : --page).toString();
    setQuery(queryObject);
  };

  console.log(ordersPaginated);
  return (
    <div>
      <p>Orders {' '}</p>
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
};

export default Orders;