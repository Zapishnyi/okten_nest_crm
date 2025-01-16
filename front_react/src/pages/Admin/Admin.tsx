import React, { FC, useEffect } from 'react';

import { useSearchParams } from 'react-router-dom';

import Table from '../../components/Table/Table';
import { initialUsersQuery } from '../../constants/initialUsersQuery';
import { queryToSearchParams } from '../../helpers/query-to-search-params-obj';
import { UsersActions } from '../../redux/Slices/usersSlice';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { UserNoStatisticType } from '../../types/UserNoStatisticType';

import styles from './Admin.module.css';

const Admin: FC = () => {
  const dispatch = useAppDispatch();
  const { users } = useAppSelector((state) => state.users);
  const [query, setQuery] = useSearchParams(queryToSearchParams(initialUsersQuery));
  const usersNoStatistic = users.map(user => {
    const { statistic, ...output } = user;
    return output;
  });
  useEffect(() => {

    if (!users.length) {
      setQuery(queryToSearchParams(initialUsersQuery));
    }
  }, []);

  useEffect(() => {
    dispatch(UsersActions.getAllUsers(Object.fromEntries(query.entries())));
  }, [query.toString()]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.table_container}>
        {!!usersNoStatistic.length && <Table<UserNoStatisticType> items={usersNoStatistic} />}
      </div>
    </div>
  );
};

export default Admin;