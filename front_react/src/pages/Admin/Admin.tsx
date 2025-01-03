import React, { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { UsersActions } from '../../redux/Slices/usersSlice';
import Table from '../../components/Table/Table';
import { TableTypeEnum } from '../../enums/table-type.enum';
import { queryToSearchParams } from '../../helpers/query-to-search-params-obj';
import { useSearchParams } from 'react-router-dom';
import { initialUsersQuery } from '../../constants/initialUsersQuery';
import { cookie } from '../../services/cookies.servise';

const Admin: FC = () => {
  const dispatch = useAppDispatch();
  const { users } = useAppSelector((state) => state.users);
  const [query, setQuery] = useSearchParams(queryToSearchParams(initialUsersQuery));
  const accessExist = !!cookie.getAccessToken();

  useEffect(() => {

    if (!users.length) {
      setQuery(queryToSearchParams(initialUsersQuery));
    }
  }, []);

  useEffect(() => {
    dispatch(UsersActions.getAllUsers(Object.fromEntries(query.entries())));
  }, [query.toString()]);

  return (
    <div>
      {!!users.length && <Table items={users} table_type={TableTypeEnum.USER} />}
    </div>
  );
};

export default Admin;