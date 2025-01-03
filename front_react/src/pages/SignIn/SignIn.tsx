import React, { FC, useEffect } from 'react';
import SignInForm from '../../forms/SignInForm/SignIn.form';
import styles from './SignIn.module.css';
import { cookie } from '../../services/cookies.servise';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { queryToSearchParams } from '../../helpers/query-to-search-params-obj';
import { initialOrdersQuery } from '../../constants/initialOrdersQuery';

const SignIn: FC = () => {
  console.log('.');
  const query = useSearchParams();
  const navigate = useNavigate();
  const accessExist = !!cookie.getAccessToken();
  useEffect(() => {
    if (accessExist) {
      navigate('/orders');
      query[1](queryToSearchParams(initialOrdersQuery));
    }
  }, []);


  return <>
    {!accessExist && <div className={styles.wrapper}>
      <SignInForm />
    </div>
    }
  </>;
};

export default SignIn;