import React, { FC, useEffect } from 'react';

import { useNavigate, useSearchParams } from 'react-router-dom';

import { initialOrdersQuery } from '../../constants/initialOrdersQuery';
import SignInForm from '../../forms/SignInForm/SignIn.form';
import { queryToSearchParams } from '../../helpers/query-to-search-params-obj';
import { cookie } from '../../services/cookies.servise';

import styles from './SignIn.module.css';


const SignIn: FC = () => {
  console.log('.');
  const query = useSearchParams();
  const navigate = useNavigate();
  const accessExist = !!cookie.getAccessToken();
  const refreshExist = !!cookie.getRefreshToken();
  useEffect(() => {

    if (accessExist || refreshExist) {
      navigate('/orders');
      query[1](queryToSearchParams(initialOrdersQuery));
    }
  }, []);


  return <div className={styles.wrapper}>
    <SignInForm />
  </div>;


};

export default SignIn;