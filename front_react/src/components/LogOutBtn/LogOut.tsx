import React, { FC } from 'react';
import { CRMApi } from '../../services/crm.api.servise';
import { cookie } from '../../services/cookies.servise';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../redux/store';
import { UsersActions } from '../../redux/Slices/usersSlice';

const LogOut: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const clickHandle = async () => {
    try {
      await CRMApi.auth.log_out();
      cookie.deleteAuthTokens();
      dispatch(UsersActions.setUser(null));
      navigate('/auth/sign-in');
    } catch (err) {
      console.log(err);
    }

  };
  return (
    <div className="button" onClick={clickHandle}>
      <p> Log out</p>
    </div>
  );
};

export default LogOut;