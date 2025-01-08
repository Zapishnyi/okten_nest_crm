import React from 'react';

import { useNavigate, useSearchParams } from 'react-router-dom';

import { initialOrdersQuery } from '../../constants/initialOrdersQuery';
import { queryToSearchParams } from '../../helpers/query-to-search-params-obj';
import { tableReset } from '../../helpers/table-reset';

import styles from './Logo.module.css';

const Logo = () => {
  const query = useSearchParams();
  const navigate = useNavigate();
  const clickHandle = () => {
    if (document.location.pathname.includes('/orders')) {
      query[1](queryToSearchParams(initialOrdersQuery));
      tableReset();
    } else {
      navigate('/orders');
      query[1](queryToSearchParams(initialOrdersQuery));
    }

  };
  return <div onClick={clickHandle} className={styles.logo_wrapper}><span>LOGO</span></div>;
};

export default Logo;