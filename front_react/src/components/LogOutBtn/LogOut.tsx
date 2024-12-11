import React, { FC } from 'react';
import styles from './LogOut.module.css';
import { CRMApi } from '../../services/crm.api.servise';
import { cookie } from '../../services/cookies.servise';
import { useNavigate } from 'react-router-dom';

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
    <div className={styles.button} onClick={clickHandle}>
      <p> Log out</p>
    </div>
  );
};

export default LogOut;