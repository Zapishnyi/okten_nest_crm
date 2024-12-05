import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './SingInForm.module.css';
import IUserSingIn from '../../interfaces/IUserSingIn';
import { AxiosError } from 'axios';
import { CRMApi } from '../../services/crm.api.servise';
import { storage } from '../../services/localStorage.servise';

interface ILocation {
  hash: string;
  key: string;
  pathname: string;
  search: string;
  state: IUserSingIn;
}

const SingInForm = () => {
  console.log('LoginForm');
  const [loginError, setLoginError] = useState<string[] | null>(null);
  const { register, handleSubmit } = useForm<IUserSingIn>({ mode: 'all' });
  const navigate = useNavigate();


  const SubmitHandler = async (credentials: IUserSingIn) => {
    try {
      console.log('credentials:', credentials);
      // const value = await CRMApi.auth.singIn(credentials);

      const { tokens } = await CRMApi.auth.singIn(credentials);
      console.log('tokens:', tokens);
      storage.setAccessToken(tokens.access);
      storage.setRefreshToken(tokens.refresh);
      navigate(`/orders`);

    } catch (error: any | AxiosError) {
      setLoginError([error.message, ...error.response.data.messages],
      );
      console.error('error details', error.response.data.detail);
      console.error('error', error);
    }
  };
  const loginAccredited: ILocation = useLocation();
  let defaultValue;
  loginAccredited.state
    ? (defaultValue = loginAccredited.state)
    : (defaultValue = { email: '', password: '' });
  return (
    <div className={styles.wrapper}>
      <form onSubmit={handleSubmit(SubmitHandler)} className={styles.form}>
        <label>
          Email:{' '}
          <input
            type="text"
            autoComplete="on"
            {...register('email')}
          />
        </label>
        <label>
          Password:{' '}
          <input
            type="text"
            autoComplete="on"
            {...register('password')}
          />
        </label>

        <button>Login</button>
      </form>
      {loginError?.length && loginError.map((e, i) => <p key={i}>{e}</p>)}
    </div>
  );
};

export default SingInForm;