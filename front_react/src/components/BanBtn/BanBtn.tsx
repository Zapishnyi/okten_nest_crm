import React, { Dispatch, FC, useState } from 'react';
import { CRMApi } from '../../services/crm.api.servise';
import { UsersActions } from '../../redux/Slices/usersSlice';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { useSearchParams } from 'react-router-dom';
import { errorHandle } from '../../helpers/error-handle';
import styles from './BanBtn.module.css';
import { SyncLoader } from 'react-spinners';

interface IProps {
  user_id: number;
  setErrorMassage: Dispatch<string[] | null>;
}

const BanBtn: FC<IProps> = ({ user_id, setErrorMassage }) => {
  const { users } = useAppSelector((state) => state.users);
  const user = users?.filter((user) => user.id === user_id)[0];
  const query = useSearchParams();
  const dispatch = useAppDispatch();
  const [isPending, setIsPending] = useState(false);
  const ban = async () => {
    setIsPending(true);
    setErrorMassage(null);
    try {
      user.ban
        ? await CRMApi.admin.reinstate_user(user_id.toString())
        : await CRMApi.admin.ban_user(user_id.toString());
      setErrorMassage(null);
      dispatch(UsersActions.getAllUsers(Object.fromEntries(query[0].entries())));
    } catch (e) {
      setErrorMassage(errorHandle(e).message);
    } finally {
      setIsPending(false);
    }

  };
  return <div className="button" onClick={ban}>
    <p>{!user.ban ? 'Ban' : 'Reinstate'}</p>
    {isPending && <div className={styles.loader_container}>
      <SyncLoader
        className={styles.loader}
        color={'#000303'}
        loading={isPending}
        size={8}
      />
    </div>}</div>;

};

export default BanBtn;