import React, { FC } from 'react';
import { CRMApi } from '../../services/crm.api.servise';
import { cookie } from '../../services/cookies.servise';
import { useNavigate } from 'react-router-dom';
import { withButtonWrapper } from '../../hoc/ButtonWrapper/withButtonWrapper';

const LogOut: FC = () => {
  const navigate = useNavigate();
  const clickHandle = async () => {
    try {
      await CRMApi.auth.log_out();
      cookie.deleteAuthTokens();
      navigate('/sign-in');
    } catch (err) {
      console.log(err);
    }

  };
  return (
    <div onClick={clickHandle}>
      <p> Log out</p>
    </div>
  );
};

export default withButtonWrapper(LogOut);