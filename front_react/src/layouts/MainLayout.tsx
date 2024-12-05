import { FC, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { CRMApi } from '../services/crm.api.servise';
import { AxiosError } from 'axios';

const MainLayout: FC = () => {
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
  }, []);
  return <>
    <Outlet />
  </>;

};

export default MainLayout;