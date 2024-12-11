import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import styles from './SignInForm.module.css';
import IUserSignIn from '../../interfaces/IUserSignIn';
import { CRMApi } from '../../services/crm.api.servise';
import { cookie } from '../../services/cookies.servise';
import { joiResolver } from '@hookform/resolvers/joi';
import userValidator from '../../validators/log-in.validator';
import { AxiosError } from 'axios';


const SignInForm = () => {
  console.log('.');
  const [loginError, setLoginError] = useState<string[] | null>(null);
  const { register, handleSubmit, formState: { errors } } = useForm<IUserSignIn>({
    mode: 'all',
    resolver: joiResolver(userValidator),
  });
  const navigate = useNavigate();

  const SubmitHandler = async (credentials: IUserSignIn) => {
    try {
      const { tokens } = await CRMApi.auth.singIn(credentials);
      // storage.setAccessToken(tokens.access);
      // storage.setRefreshToken(tokens.refresh);
      cookie.setAccessToken(tokens.access);
      cookie.setRefreshToken(tokens.refresh);
      navigate(`/orders`);
    } catch (error) {
      const err = error as AxiosError;
      console.error('error details:', err.message);
      setLoginError([err.message]);
    }
  };
  return (
    <div className={styles.wrapper}>
      <form onSubmit={handleSubmit(SubmitHandler)} className={styles.form}>
        <div>
          <label>
            Email:{' '}
            <input
              type="text"
              autoComplete="on"
              {...register('email')}
            />
          </label>
          {errors.email && <p>{errors.email.message}</p>}
        </div>
        <div>
          <label>
            Password:{' '}
            <input
              type="text"
              autoComplete="on"
              {...register('password')}
            />
          </label>
          {errors.password && <p>{errors.password.message}</p>}
        </div>
        <button>Login</button>

      </form>
      {loginError?.length && loginError.map((e, i) => <p key={i}>{e}</p>)}
    </div>
  );
};

export default SignInForm;