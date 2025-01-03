import React, { FC, useState } from 'react';
import styles from './ActivateForm.module.css';
import { errorHandle } from '../../helpers/error-handle';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import userActivateValidator from '../../validators/user-activate.validator';
import IUserActivate from '../../interfaces/IUserActivate';
import { Icon } from 'react-icons-kit';
import { ic_visibility_outline } from 'react-icons-kit/md/ic_visibility_outline';
import { ic_visibility_off_outline } from 'react-icons-kit/md/ic_visibility_off_outline';

const ActivateForm: FC = () => {
  const [passwordVisibility, setPasswordVisibility] = useState<boolean>(false);
  const [re_passwordVisibility, setRe_passwordVisibility] = useState<boolean>(false);
  const { register, handleSubmit, formState: { errors, isValid } } = useForm<IUserActivate>({
    mode: 'all',
    resolver: joiResolver(userActivateValidator),
  });
  const [errorMessage, setErrorMassage] = useState<string[] | null>(null);
  const formSubmit = async (formData: IUserActivate) => {
    try {

    } catch (e) {
      setErrorMassage(errorHandle(e).message);
    }
  };
  const re_PasswordVisibilityHandle = () => {
    setRe_passwordVisibility(current => !current);
  };
  const passwordVisibilityHandle = () => {
    setPasswordVisibility(current => !current);
  };
  return (
    <form onSubmit={handleSubmit(formSubmit)} className={styles.form}>
      <label>Email:
        <input type="text" {...register('email')} />
        {errors.email && <p>{errors.email.message}</p>}
      </label>
      <label>Password:
        <input type="password" {...register('password')} />
        {errors.password && <p>{errors.password.message}</p>}
        <Icon
          className={styles.eye}
          onClick={passwordVisibilityHandle}
          icon={passwordVisibility ? ic_visibility_outline : ic_visibility_off_outline}
          size={25}
        />
      </label>
      <label>
        Confirm password:
        <input type={re_passwordVisibility ? 'text' : 'password'} autoComplete="on" {...register('re_password')} />
        {errors.re_password && <p>{errors.re_password.message}</p>}
        <Icon
          className={styles.eye}
          onClick={re_PasswordVisibilityHandle}
          icon={re_passwordVisibility ? ic_visibility_outline : ic_visibility_off_outline}
          size={25}
        />
      </label>

      <button className="button" disabled={!isValid}>Submit</button>
      {errorMessage?.length &&
        <div className={styles.response_error}>{errorMessage.map((e, i) => <p key={i}>{e}</p>)}</div>}
    </form>
  );
};

export default ActivateForm;