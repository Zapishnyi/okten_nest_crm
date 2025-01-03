import React, { FC } from 'react';
import { CRMApi } from '../../services/crm.api.servise';
import { UsersActions } from '../../redux/Slices/usersSlice';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { useSearchParams } from 'react-router-dom';
import { errorHandle } from '../../helpers/error-handle';

interface IProps {
  user_id: number;
}

const BanBtn: FC<IProps> = ({ user_id }) => {
  const { users } = useAppSelector((state) => state.users);
  const user = users?.filter((user) => user.id === user_id)[0];
  const query = useSearchParams();
  const dispatch = useAppDispatch();
  const ban = async () => {
    try {
      user.ban
        ? await CRMApi.admin.reinstate_user(user_id.toString())
        : await CRMApi.admin.ban_user(user_id.toString());
      dispatch(UsersActions.getAllUsers(Object.fromEntries(query[0].entries())));
    } catch (e) {
      errorHandle(e);
    }
  };
  return <div className="button" onClick={ban}>{!user.ban ? 'Ban' : 'Reinstate'}</div>;

};

export default BanBtn;