import React, { FC, useEffect, useState } from 'react';

import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

import { initialOrdersQuery } from '../../constants/initialOrdersQuery';
import { queryToSearchParams } from '../../helpers/query-to-search-params-obj';
import { tableReset } from '../../helpers/table-reset';

import styles from './BtnOrders.module.css';

const BtnOrders: FC = () => {
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
  }, [query[0].toString()]);
  const clickHandle = () => {
    if (location.pathname.includes('/orders')) {
      query[1](queryToSearchParams(initialOrdersQuery));
      tableReset();
    } else {
      navigate('/orders');
      query[1](queryToSearchParams(initialOrdersQuery));
    }

  };
  return (
    <div className={['button', isChosen ? styles.chosen : ''].join(' ')} onClick={clickHandle}>
      <p>Orders</p>
    </div>
  );
};

export default BtnOrders;