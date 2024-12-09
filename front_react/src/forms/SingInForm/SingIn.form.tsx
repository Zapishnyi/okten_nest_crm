import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import styles from './SingInForm.module.css';
import IUserSingIn from '../../interfaces/IUserSingIn';
import { AxiosError } from 'axios';
import { CRMApi } from '../../services/crm.api.servise';
import { cookie } from '../../services/cookies.servise';

interface ILocation {
  hash: string;
  key: string;
  pathname: string;
  search: string;
  state: IUserSingIn;
}

const SingInForm = () => {
  console.log('.');
  const [loginError, setLoginError] = useState<string[] | null>(null);
  const { register, handleSubmit } = useForm<IUserSingIn>({ mode: 'all' });
  const navigate = useNavigate();


  const SubmitHandler = async (credentials: IUserSingIn) => {
    try {
      const { tokens } = await CRMApi.auth.singIn(credentials);
      // storage.setAccessToken(tokens.access);
      // storage.setRefreshToken(tokens.refresh);
      cookie.setAccessToken(tokens.access);
      cookie.setRefreshToken(tokens.refresh);
      navigate(`/orders`);
    } catch (error: any | AxiosError) {
      setLoginError([error.message, ...error.response.data.messages],
      );
      console.error('error details:', error.response.data.detail);
    }
  };
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