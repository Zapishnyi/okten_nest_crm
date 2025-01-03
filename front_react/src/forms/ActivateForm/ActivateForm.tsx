import React, { FC, useState } from 'react';
import styles from './ActivateForm.module.css';
import { errorHandle } from '../../helpers/error-handle';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import IUserSignIn from '../../interfaces/IUserSignIn';
import userActivateValidator from '../../validators/user-activate.validator';

const ActivateForm: FC = () => {
  const { register, handleSubmit, formState: { errors, isValid } } = useForm<IUserSignIn>({
    mode: 'all',
    resolver: joiResolver(userActivateValidator),
  });
  const [errorMessage, setErrorMassage] = useState<string[] | null>(null);
  const formSubmit = async (formData: IUserSignIn) => {
    try {

    } catch (e) {
      setErrorMassage(errorHandle(e).message);
    }
  };
  return (
    <form onSubmit={handleSubmit(formSubmit)}>
      <label>Email:
        <input type="text" {...register('email')} />
        {errors.email && <p>{errors.email.message}</p>}
      </label>
      <label>Password:
        <input type="text" {...register('password')} />
        {errors.password && <p>{errors.password.message}</p>}
      </label>

      <button className="button" disabled={!isValid}>Submit</button>
      {errorMessage?.length &&
        <div className={styles.response_error}>{errorMessage.map((e, i) => <p key={i}>{e}</p>)}</div>}
    </form>
  );
};

export default ActivateForm;