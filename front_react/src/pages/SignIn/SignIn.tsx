import React, { FC, useEffect } from 'react';
import SignInForm from '../../forms/SignInForm/SignIn.form';
import styles from './SignIn.module.css';
import { cookie } from '../../services/cookies.servise';
import { useNavigate } from 'react-router-dom';

const SignIn: FC = () => {
  console.log('.');
  const navigate = useNavigate();
  const accessExist = !!cookie.getAccessToken();
  useEffect(() => {
    console.log('accessExist:', accessExist);
    if (accessExist) {
      navigate('/orders');
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