import React, { Dispatch, FC, useState } from 'react';
import styles from './CreateUserForm.module.css';
import { useForm } from 'react-hook-form';
import { IUserCreate } from '../../interfaces/IUserCreate';
import { joiResolver } from '@hookform/resolvers/joi';
import userCreateValidator from '../../validators/user-create.validator';
import { CRMApi } from '../../services/crm.api.servise';
import { UsersActions } from '../../redux/Slices/usersSlice';
import { useAppDispatch } from '../../redux/store';
import { useSearchParams } from 'react-router-dom';
import { errorHandle } from '../../helpers/error-handle';

interface IProps {
  setCreateUserFormVisible: Dispatch<boolean>;
}

const CreateUserForm: FC<IProps> = ({ setCreateUserFormVisible }) => {
  const [errorMessage, setErrorMassage] = useState<string[] | null>(null);
  const dispatch = useAppDispatch();
  const query = useSearchParams();
  const { register, handleSubmit, formState: { errors, isValid } } = useForm<IUserCreate>({
    mode: 'all',
    resolver: joiResolver(userCreateValidator),
  });
  const formSubmit = async (formData: IUserCreate) => {
    try {
      await CRMApi.admin.create_user(formData);
      dispatch(UsersActions.getAllUsers(Object.fromEntries(query[0].entries())));
      setCreateUserFormVisible(false);
      setErrorMassage(null);
    } catch (e) {
      setErrorMassage(errorHandle(e).message);
    }
  };
  const formExit = () => {
    setCreateUserFormVisible(false);
  };
  return (
    <div className={styles.wrapper}>
      <form onSubmit={handleSubmit(formSubmit)}>
        <label>Name:
          <input type="text" {...register('name')} />
          {errors.name && <p>{errors.name.message}</p>}
        </label>
        <label>Surname:
          <input type="text" {...register('surname')} />
          {errors.surname && <p>{errors.surname.message}</p>}
        </label>
        <label>Email:
          <input type="text" {...register('email')} />
          {errors.email && <p>{errors.email.message}</p>}
        </label>
        <div className={styles.buttons}>
          <button className="button" disabled={!isValid}>Submit</button>
          <div className="button" onClick={formExit}><span>Cancel</span></div>
        </div>
        {errorMessage?.length &&
          <div className={styles.response_error}>{errorMessage.map((e, i) => <p key={i}>{e}</p>)}</div>}
      </form>
    </div>
  );
};

export default CreateUserForm;