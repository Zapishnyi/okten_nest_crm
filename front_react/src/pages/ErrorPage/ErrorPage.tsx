import React from 'react';
import styles from './ErrorPage.module.css';
import ReturnToHomeBtn from '../../components/ReturnToHomeBtn/ReturnToHomeBtn';

const ErrorPage = () => {

  return (
    <div className={styles.error}>
      <h1>Ups, something went wrong!</h1>
      <ReturnToHomeBtn />
    </div>
  );
};

export default ErrorPage;