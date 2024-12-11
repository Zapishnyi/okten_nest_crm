import React, { FC } from 'react';
import SignInForm from '../../forms/SignInForm/SignIn.form';
import styles from './SignIn.module.css';

const SignIn: FC = () => {
  console.log('.');
  return (
    <div className={styles.wrapper}>
      <SignInForm />
    </div>
  );
};

export default SignIn;