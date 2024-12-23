import React, { FC, useEffect, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import styles from './AdministratorBtn.module.css';
import { queryToSearchParams } from '../../helpers/query-to-search-params-obj';
import { initialUsersQuery } from '../../constants/initialUsersQuery';
import { tableReset } from '../../helpers/table-reset';

const AdministratorBtn: FC = () => {
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
  }, [query]);
  const clickHandle = () => {
    if (location.pathname.includes('/admin')) {
      query[1](queryToSearchParams(initialUsersQuery));
      tableReset();
    } else {
      navigate('/admin');
    }
  };
  return (
    <div className={['button', isChosen ? styles.chosen : ''].join(' ')} onClick={clickHandle}>
      <p>Administrator</p>
    </div>
  );
};

export default AdministratorBtn;