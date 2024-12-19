import React, { FC, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { CRMApi } from '../../services/crm.api.servise';
import { AxiosError } from 'axios';
import { setNavigate } from '../../helpers/navigate-to';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { UserActions } from '../../redux/Slices/userSlice';
import Header from '../../components/Header/Header';

const MainLayout: FC = () => {
  console.log('.');
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  useEffect(() => {
    const getData = async () => {
      try {
        // const health = await CRMApi.health();
        // console.log('health:', health);
        if (!user) {
          dispatch(UserActions.setUser(await CRMApi.auth.me()));
        }
      } catch (e) {
        const error = e as AxiosError;
        console.log('health check failed with error:', error.message);
      }
    };
    void getData();

    //to make navigate function access globally
    setNavigate(navigate);

  }, []);


  return <>
    <Header />
    <Outlet />
  </>;

};

export default MainLayout;