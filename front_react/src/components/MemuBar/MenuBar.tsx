import React, { FC } from 'react';
import styles from './MenuBar.module.css';
import { CRMApi } from '../../services/crm.api.servise';
import { useNavigate } from 'react-router-dom';
import { cookie } from '../../services/cookies.servise';

const MenuBar: FC = () => {
  const navigate = useNavigate();
  const closeHandle = () => {
    const menuBar = document.getElementById('menu-bar') as HTMLDivElement;
    menuBar.classList.remove('lower');
  };
  const logOutHandle = async () => {
    try {
      await CRMApi.auth.log_out();
      cookie.deleteAuthTokens();
      navigate('/sing-in');
    } catch (err) {
      console.log(err);
    }

  };
  return (
    <div id={'menu-bar'} className={styles.wrapper}>
      <ul>
        <li onClick={logOutHandle}>
          <p>Log out</p>
        </li>
        <li className={styles.button} onClick={closeHandle}>
          <p>Close</p>
        </li>

      </ul>


    </div>
  );
};

export default MenuBar;