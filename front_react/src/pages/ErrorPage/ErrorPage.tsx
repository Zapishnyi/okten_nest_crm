import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ErrorPage.module.css';

const ErrorPage = () => {
  const navigate = useNavigate();
  const clickHandle = () => {
    navigate('/orders');
  };
  return (
    <div className={styles.error}>
      <h1>Ups, something goes wrong!</h1>
      <div onClick={clickHandle}><p>Return to main page</p></div>
    </div>
  );
};

export default ErrorPage;