import React, { FC, useState } from 'react';

import { useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';

import IOrderEdit from '../../interfaces/IOrderEdit';
import { IUserCreate } from '../../interfaces/IUserCreate';
import { useAppDispatch } from '../../redux/store';
import styles from '../Form.module.css';


const OrderEditForm: FC = () => {
  const [errorMessage, setErrorMassage] = useState<string[] | null>(null);
  const dispatch = useAppDispatch();
  const query = useSearchParams();
  const { register, handleSubmit, formState: { errors, isValid } } = useForm<IOrderEdit>({
    mode: 'all',
    // resolver: joiResolver(),
  });
  const formSubmit = async (formData: IUserCreate) => {
    //   try {
    //     await CRMApi.admin.create_user(formData);
    //     dispatch(UsersActions.getAllUsers(Object.fromEntries(query[0].entries())));
    //     setOrderEditFormVisible(false);
    //     setErrorMassage(null);
    //   } catch (e) {
    //     setErrorMassage(errorHandle(e).message);
    //   }
  };

  return <form className={styles.form} onSubmit={handleSubmit(formSubmit)}>
    {/*<FormInput<IUserCreate>*/}
    {/*  register={register}*/}
    {/*  field_name={'name'}*/}
    {/*  field_label={'Name'}*/}
    {/*  error={errors.name?.message}*/}
    {/*/>*/}
    {/*<FormInput<IUserCreate>*/}
    {/*  register={register}*/}
    {/*  field_name={'surname'}*/}
    {/*  field_label={'Surname'}*/}
    {/*  error={errors.surname?.message}*/}
    {/*/>*/}
    {/*<FormInput<IUserCreate>*/}
    {/*  register={register}*/}
    {/*  field_name={'email'}*/}
    {/*  field_label={'Email'}*/}
    {/*  error={errors.email?.message}*/}
    {/*/>*/}
    {/*<div className={styles.buttons}>*/}
    {/*  <button className="button" disabled={!isValid}>Submit</button>*/}
    {/*  <div className="button" onClick={() => setCreateUserFormVisible(false)}>*/}
    {/*    <span>Cancel</span>*/}
    {/*  </div>*/}
    {/*</div>*/}
    {/*{errorMessage?.length &&*/}
    {/*  <div className={styles.response_error}>{errorMessage.map((e, i) => <p key={i}>{e}</p>)}</div>}*/}
  </form>;


};

export default OrderEditForm;