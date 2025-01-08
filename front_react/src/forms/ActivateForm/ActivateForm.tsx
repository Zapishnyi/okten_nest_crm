import React, { FC, useState } from 'react';

import { joiResolver } from '@hookform/resolvers/joi';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

import FormInput from '../../components/FormInput/FormInput';
import { errorHandle } from '../../helpers/error-handle';
import IUserActivateFormData from '../../interfaces/IUserActivateFormData';
import { cookie } from '../../services/cookies.servise';
import { CRMApi } from '../../services/crm.api.servise';
import userActivateValidator from '../../validators/user-activate.validator';
import styles from '../Form.module.css';

const ActivateForm: FC = () => {
  const { activate_token } = useParams<Record<string, string | undefined>>();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isValid } } = useForm<IUserActivateFormData>({
    mode: 'all',
    resolver: joiResolver(userActivateValidator),
  });
  const [errorMessage, setErrorMassage] = useState<string[] | null>(null);
  const formSubmit = async (formData: IUserActivateFormData) => {
    try {
      cookie.setActivateToken(activate_token || '');
      await CRMApi.auth.activate({ password: formData.password });
      navigate('/auth/sign-in');
    } catch (e) {
      setErrorMassage(errorHandle(e).message);
    } finally {
      cookie.deleteActivateToken();
    }
  };

  return (
    <form onSubmit={handleSubmit(formSubmit)} className={styles.form}>
      <FormInput<IUserActivateFormData>
        register={register}
        field_name={'password'}
        field_label={'Password'}
        isPassword={true}
        error={errors.password?.message} />
      <FormInput<IUserActivateFormData>
        register={register}
        field_name={'re_password'}
        field_label={'Confirm password'}
        isPassword={true}
        error={errors.re_password?.message} />
      <button className={['button', styles.form_button].join(' ')} disabled={!isValid}>Submit</button>
      {errorMessage?.length &&
        <div className={styles.response_error}>{errorMessage.map((e, i) => <p key={i}>{e}</p>)}</div>}
    </form>
  );
};

export default ActivateForm;