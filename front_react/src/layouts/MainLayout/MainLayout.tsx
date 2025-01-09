import React, { FC, useEffect } from 'react';

import { AxiosError } from 'axios';
import { Outlet, useNavigate } from 'react-router-dom';
import { FadeLoader } from 'react-spinners';

import Header from '../../components/Header/Header';
import CreateUserForm from '../../forms/CreateUserForm/CreateUserForm';
import OrderEditForm from '../../forms/OrderEditForm/OrderEditForm';
import { setNavigate } from '../../helpers/navigate-to';
import { UsersActions } from '../../redux/Slices/usersSlice';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { CRMApi } from '../../services/crm.api.servise';

import styles from './MainLayout.module.css';


const MainLayout: FC = () => {
  console.log('.');
  const dispatch = useAppDispatch();
  const { userLogged, usersLoadingState } = useAppSelector((state) => state.users);
  const { createUserFormVisible, editOrderFormVisible } = useAppSelector(state => state.visibility);
  const { ordersLoadingState } = useAppSelector((state) => state.orders);
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      try {
        // const health = await CRMApi.health();
        // console.log('health:', health);
        if (!userLogged) {
          dispatch(UsersActions.setUser(await CRMApi.auth.me()));
        }
      } catch (e) {
        const error = e as AxiosError;
        console.error('Logged user data receive sequence failed with error:', error.message);
      }
    };
    void getData();

    //to make navigate function access globally from any fu
    setNavigate(navigate);

  }, []);


  return <div className={styles.wrapper}>
    <Header />
    <Outlet />
    {
      (ordersLoadingState || usersLoadingState) &&
      <div className={styles.loader}>
        <FadeLoader
          color={'#5dade2 '}
          loading={ordersLoadingState || usersLoadingState}
          aria-label="Loading Spinner"
          data-testid="loader" />
      </div>

    }
    {createUserFormVisible &&
      <div className={styles.modal_window_base}>
        <CreateUserForm />
      </div>}
    {editOrderFormVisible &&
      <div className={styles.modal_window_base}>
        <OrderEditForm />
      </div>}
  </div>;

};

export default MainLayout;