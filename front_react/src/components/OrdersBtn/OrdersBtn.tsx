import React, { FC, useEffect, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import styles from './OrdersBtn.module.css';
import { queryToSearchParams } from '../../helpers/query-to-search-params-obj';
import { initialOrdersQuery } from '../../constants/initialOrdersQuery';
import { tableReset } from '../../helpers/table-reset';

const OrdersBtn: FC = () => {
  const query = useSearchParams();
  const navigate = useNavigate();
  const [isChosen, setIsChosen] = useState<boolean>(false);
  const location = useLocation();
  useEffect(() => {
    if (location.pathname.includes('/orders')) {
      setIsChosen(true);
    } else {
      setIsChosen(false);
    }
  }, [query]);
  const clickHandle = () => {
    if (location.pathname.includes('/orders')) {
      query[1](queryToSearchParams(initialOrdersQuery));
      tableReset();
    } else {
      navigate('/orders');
    }

  };
  return (
    <div className={['button', isChosen ? styles.chosen : ''].join(' ')} onClick={clickHandle}>
      <p>Orders</p>
    </div>
  );
};

export default OrdersBtn;