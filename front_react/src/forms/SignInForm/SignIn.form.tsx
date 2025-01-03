import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styles from './SignInForm.module.css';
import IUserSignIn from '../../interfaces/IUserSignIn';
import { CRMApi } from '../../services/crm.api.servise';
import { cookie } from '../../services/cookies.servise';
import { useAppDispatch } from '../../redux/store';
import { UsersActions } from '../../redux/Slices/usersSlice';
import { queryToSearchParams } from '../../helpers/query-to-search-params-obj';
import { initialOrdersQuery } from '../../constants/initialOrdersQuery';
import { errorHandle } from '../../helpers/error-handle';


const SignInForm = () => {
  console.log('.');
  const [errorMessage, setErrorMassage] = useState<string[] | null>(null);
  const { register, handleSubmit, formState: { errors } } = useForm<IUserSignIn>();
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
        {errorMessage?.length && errorMessage.map((e, i) => <p key={i}>{e}</p>)}
      </form>

    </div>
  );
};

export default SignInForm;