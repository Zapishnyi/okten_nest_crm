import React, { FC, memo, useEffect } from 'react';

import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

import Table from '../../components/Table/Table';
import { initialOrdersQuery } from '../../constants/initialOrdersQuery';
import { initialUsersQuery } from '../../constants/initialUsersQuery';
import { UserRoleEnum } from '../../enums/user-role.enum';
import { queryToSearchParams } from '../../helpers/query-to-search-params-obj';
import { UsersActions } from '../../redux/Slices/usersSlice';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { UserNoStatisticType } from '../../types/UserNoStatisticType';

import styles from './Admin.module.css';

const Admin: FC = memo(() => {

  const location = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { users, userLogged } = useAppSelector((state) => state.users);
  const [query, setQuery] = useSearchParams();
  const usersNoStatistic = users.map(user => {
    const { statistic, ...output } = user;
    return output;
  });

  useEffect(() => {
    if (userLogged?.role !== UserRoleEnum.ADMIN) {
      const searchParams = new URLSearchParams(queryToSearchParams(initialOrdersQuery));
      navigate(`/orders?${searchParams}`);
    }
    if (!location.search.match(/^(?=.*\bsort=\b)(?=.*\bsortBy=\b).*/)) {
      setQuery(queryToSearchParams(initialUsersQuery), { replace: true });
      dispatch(UsersActions.getAllUsers(queryToSearchParams(initialUsersQuery)));
    } else {
      dispatch(UsersActions.getAllUsers(Object.fromEntries(query.entries())));
    }

  }, [location.search]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.table_container}>
        {!!usersNoStatistic.length && <Table<UserNoStatisticType> items={usersNoStatistic} />}
      </div>
    </div>
  );
});

export default Admin;