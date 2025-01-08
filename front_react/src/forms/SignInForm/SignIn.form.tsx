import React, { useState } from 'react';

import { useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';

import FormInput from '../../components/FormInput/FormInput';
import { initialOrdersQuery } from '../../constants/initialOrdersQuery';
import { errorHandle } from '../../helpers/error-handle';
import { queryToSearchParams } from '../../helpers/query-to-search-params-obj';
import IUserSignIn from '../../interfaces/IUserSignIn';
import { UsersActions } from '../../redux/Slices/usersSlice';
import { useAppDispatch } from '../../redux/store';
import { cookie } from '../../services/cookies.servise';
import { CRMApi } from '../../services/crm.api.servise';
import styles from '../Form.module.css';


const SignInForm = () => {
  console.log('.');
  const [errorMessage, setErrorMassage] = useState<string[] | null>(null);
  const { register, handleSubmit } = useForm<IUserSignIn>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const query = useSearchParams();
  const SubmitHandler = async (credentials: IUserSignIn) => {
    try {
      const { tokens, user } = await CRMApi.auth.singIn(credentials);
      // storage.setAccessToken(tokens.access);
      // storage.setRefreshToken(tokens.refresh);
      cookie.setAccessToken(tokens.access);
      cookie.setRefreshToken(tokens.refresh);
      dispatch(UsersActions.setUser(user));
      navigate(`/orders`);
      query[1](queryToSearchParams(initialOrdersQuery));
    } catch (e) {
      setErrorMassage(errorHandle(e).message);
    }
  };
  return <form className={styles.form} onSubmit={handleSubmit(SubmitHandler)}>
    <FormInput<IUserSignIn>
      register={register}
      field_name={'email'}
      field_label={'Email'} />
    <FormInput<IUserSignIn>
      register={register}
      field_name={'password'}
      field_label={'Password'}
      isPassword={true} />
    <button className={['button', styles.form_button].join(' ')}>Login</button>
    {errorMessage?.length && errorMessage.map((e, i) => <p key={i}>{e}</p>)}
  </form>;
};

export default SignInForm;