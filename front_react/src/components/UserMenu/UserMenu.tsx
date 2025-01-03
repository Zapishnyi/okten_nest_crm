import React from 'react';
import UserIcon from '../UserIcon/UserIcon';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { CRMApi } from '../../services/crm.api.servise';
import { cookie } from '../../services/cookies.servise';
import { UsersActions } from '../../redux/Slices/usersSlice';
import styles from './UserManu.module.css';

const UserMenu = () => {
  const { userLogged } = useAppSelector((state) => state.users);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const clickHandle = async () => {
    try {
      await CRMApi.auth.log_out();
      cookie.deleteAuthTokens();
      dispatch(UsersActions.setUser(null));
      navigate('/auth/sign-in');
    } catch (err) {
      console.error(`Log out failed with error: ${err}`);
    }

  };
  return <div className={styles.user_container} onClick={clickHandle}>
    {!!userLogged && <>
      <UserIcon />
      <div className={styles.user_context}>
        <p className={styles.user_name}>{`${userLogged?.name} ${userLogged?.surname}`}</p>
        <p className={styles.logout}>{'Log out'}</p>
      </div>
    </>}
  </div>;

};

export default UserMenu;