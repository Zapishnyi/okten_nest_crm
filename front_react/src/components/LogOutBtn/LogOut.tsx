import React, { FC } from 'react';
import { CRMApi } from '../../services/crm.api.servise';
import { cookie } from '../../services/cookies.servise';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../redux/store';
import { UserActions } from '../../redux/Slices/userSlice';

const LogOut: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const clickHandle = async () => {
    try {
      await CRMApi.auth.log_out();
      cookie.deleteAuthTokens();
      dispatch(UserActions.setUser(null));
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