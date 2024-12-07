import React, { FC, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { CRMApi } from '../services/crm.api.servise';
import { AxiosError } from 'axios';
import { setNavigate } from '../helpers/navigate-to';

const MainLayout: FC = () => {
  console.log('.');
  useEffect(() => {
    const getData = async () => {
      try {
        const health = await CRMApi.health();
        console.log('health:', health);
      } catch (e) {
        const error = e as AxiosError;
        console.log(error.message);
      }
    };
    void getData();

    //to make navigate function access globally
    setNavigate(navigate);

  }, []);

  const navigate = useNavigate();

  return <>
    <Outlet />
  </>;

};

export default MainLayout;