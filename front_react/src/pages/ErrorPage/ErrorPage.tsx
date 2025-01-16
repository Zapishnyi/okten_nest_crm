import React, { FC } from 'react';

import { useNavigate, useSearchParams } from 'react-router-dom';

import ErrorsContainer from '../../components/ErrorsContainer/ErrorsContainer';

import styles from './ErrorPage.module.css';


const ErrorPage: FC = () => {
  const navigate = useNavigate();
  const searchParams = useSearchParams();
  const errors = Array.from(searchParams[0].values());
  const clickHandle = () => {
    navigate('/orders');
  };
  return (
    <div className={styles.error}>
      <div className={styles.content}>
        <h1>Ups, something went wrong!</h1>
        <div onClick={clickHandle} className="button"><p>Return to main page</p></div>
        {!!errors.length && <ErrorsContainer errors={errors} />}
      </div>


    </div>
  );
};

export default ErrorPage;