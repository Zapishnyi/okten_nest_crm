import React, { FC, useState } from 'react';

import { joiResolver } from '@hookform/resolvers/joi';
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';

import FormInput from '../../components/FormInput/FormInput';
import { errorHandle } from '../../helpers/error-handle';
import { IUserCreate } from '../../interfaces/IUserCreate';
import { UsersActions } from '../../redux/Slices/usersSlice';
import { VisibilityActions } from '../../redux/Slices/visabilitySlice';
import { useAppDispatch } from '../../redux/store';
import { CRMApi } from '../../services/crm.api.servise';
import userCreateValidator from '../../validators/user-create.validator';
import styles from '../Form.module.css';


const CreateUserForm: FC = () => {
  const [errorMessage, setErrorMassage] = useState<string[] | null>(null);
  const dispatch = useAppDispatch();
  const query = useSearchParams();
  const { register, handleSubmit, formState: { errors, isValid } } = useForm<IUserCreate>({
    mode: 'all',
    resolver: joiResolver(userCreateValidator),
  });
  const closeForm = () => {
    dispatch(VisibilityActions.createUserFormVisible(false));
  };
  const formSubmit = async (formData: IUserCreate) => {
    try {
      await CRMApi.admin.create_user(formData);
      dispatch(UsersActions.getAllUsers(Object.fromEntries(query[0].entries())));
      closeForm();
      setErrorMassage(null);
    } catch (e) {
      setErrorMassage(errorHandle(e).message);
    }
  };

  return <form className={styles.form} onSubmit={handleSubmit(formSubmit)}>
    <FormInput<IUserCreate>
      register={register}
      field_name={'name'}
      field_label={'Name'}
      error={errors.name?.message}
    />
    <FormInput<IUserCreate>
      register={register}
      field_name={'surname'}
      field_label={'Surname'}
      error={errors.surname?.message}
    />
    <FormInput<IUserCreate>
      register={register}
      field_name={'email'}
      field_label={'Email'}
      error={errors.email?.message}
    />
    <div className={styles.buttons}>
      <button className="button" disabled={!isValid}>Submit</button>
      <div className="button" onClick={() => closeForm()}>
        <span>Cancel</span>
      </div>
    </div>
    {errorMessage?.length &&
      <div className={styles.response_error}>{errorMessage.map((e, i) => <p key={i}>{e}</p>)}</div>}
  </form>;


};

export default CreateUserForm;