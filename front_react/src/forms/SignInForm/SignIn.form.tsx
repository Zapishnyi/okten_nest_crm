import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import styles from './SignInForm.module.css';
import IUserSignIn from '../../interfaces/IUserSignIn';
import { CRMApi } from '../../services/crm.api.servise';
import { cookie } from '../../services/cookies.servise';
import { AxiosError } from 'axios';
import IErrorResponse from '../../interfaces/IErrorResponse';
import { useAppDispatch } from '../../redux/store';
import { UsersActions } from '../../redux/Slices/usersSlice';


const SignInForm = () => {
  console.log('.');
  const [loginError, setLoginError] = useState<string[] | null>(null);
  const { register, handleSubmit, formState: { errors } } = useForm<IUserSignIn>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const SubmitHandler = async (credentials: IUserSignIn) => {
    try {
      const { tokens, user } = await CRMApi.auth.singIn(credentials);
      // storage.setAccessToken(tokens.access);
      // storage.setRefreshToken(tokens.refresh);
      cookie.setAccessToken(tokens.access);
      cookie.setRefreshToken(tokens.refresh);
      dispatch(UsersActions.setUser(user));
      navigate(`/orders`);
    } catch (error) {
      const err = error as AxiosError<IErrorResponse>;
      if (err.response?.data.messages) {
        console.error('error details:', err.response?.data.messages);
        setLoginError(err.response?.data.messages || null);
      } else {
        setLoginError([err.message]);
      }

    }
  };
  return (
    <div className={styles.wrapper}>
      <form className={styles.form} onSubmit={handleSubmit(SubmitHandler)}>
        <div>
          <label>
            Email:{' '}
            <input
              type="text"
              autoComplete="on"
              {...register('email')}
            />
          </label>

        </div>
        <div>
          <label>
            Password:{' '}
            <input
              type="password"
              autoComplete="on"
              {...register('password')}
            />
          </label>

        </div>
        <button className="button">Login</button>
        {loginError?.length && loginError.map((e, i) => <p key={i}>{e}</p>)}
      </form>

    </div>
  );
};

export default SignInForm;