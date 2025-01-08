import React, { FC, useEffect, useState } from 'react';

import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

import { initialUsersQuery } from '../../constants/initialUsersQuery';
import { queryToSearchParams } from '../../helpers/query-to-search-params-obj';
import { tableReset } from '../../helpers/table-reset';

import styles from './BtnUsers.module.css';

const BtnUsers: FC = () => {
  const query = useSearchParams();
  const navigate = useNavigate();
  const [isChosen, setIsChosen] = useState<boolean>(false);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes('/admin')) {
      setIsChosen(true);
    } else {
      setIsChosen(false);
    }
  }, [query[0].toString()]);

  const clickHandle = () => {
    if (location.pathname.includes('/admin')) {
      query[1](queryToSearchParams(initialUsersQuery));
      tableReset();
    } else {
      navigate('/admin');
      query[1](queryToSearchParams(initialUsersQuery));
    }
  };
  return (
    <div className={['button', isChosen ? styles.chosen : ''].join(' ')} onClick={clickHandle}>
      <p>Managers</p>
    </div>
  );
};

export default BtnUsers;