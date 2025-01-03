import React, { FC, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { CRMApi } from '../../services/crm.api.servise';
import { AxiosError } from 'axios';
import { setNavigate } from '../../helpers/navigate-to';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { UsersActions } from '../../redux/Slices/usersSlice';
import Header from '../../components/Header/Header';
import styles from './MainLayout.module.css';
import { FadeLoader } from 'react-spinners';

const MainLayout: FC = () => {
  console.log('.');
  const dispatch = useAppDispatch();
  const { userLogged, usersLoadingState } = useAppSelector((state) => state.users);
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
          // cssOverride={override}
          // height={50}

          aria-label="Loading Spinner"
          data-testid="loader" />
      </div>

    }
  </div>;

};

export default MainLayout;