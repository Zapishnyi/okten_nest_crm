import React from 'react';

import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

import { initialOrdersQuery } from '../../constants/initialOrdersQuery';
import { queryToSearchParams } from '../../helpers/query-to-search-params-obj';
import { tableReset } from '../../helpers/table-reset';

import styles from './Logo.module.css';

const Logo = () => {
  const location = useLocation();
  const query = useSearchParams();
  const navigate = useNavigate();
  const clickHandle = () => {
    if (location.pathname !== '/orders') {
      const searchParams = new URLSearchParams(queryToSearchParams(initialOrdersQuery));
      navigate(`/orders?${searchParams}`);
    } else {
      query[1](queryToSearchParams(initialOrdersQuery));
    }
    tableReset();
  };
  return <div onClick={clickHandle} className={styles.logo_wrapper}><span>LOGO</span></div>;
};

export default Logo;