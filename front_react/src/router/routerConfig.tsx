import { createHashRouter, Navigate } from 'react-router-dom';
import React from 'react';
import SignIn from '../pages/SignIn/SignIn';
import Orders from '../pages/Orders/Orders';
import MainLayout from '../layouts/MainLayout/MainLayout';
import ErrorPage from '../pages/ErrorPage/ErrorPage';
import AuthLayout from '../layouts/AuthLayout/AuthLayout';
import Activate from '../pages/Activate/Activate';
import Admin from '../pages/Admin/Admin';

export const routerConfig = createHashRouter([
  {
    index: true,
    element: <Navigate to={'/orders'} />,
  },
  {
    path: 'auth',
    element: <AuthLayout />,
    children: [
      {
        path: 'sign-in',
        element: <SignIn />,
      },
      {
        path: 'activate',
        element: <Activate />,
      },

    ],
  },
  {
    path: '',
    element: <MainLayout />,
    children: [
      {
        path: 'orders',
        element: <Orders />,
      },
      {
        path: 'admin',
        element: <Admin />,
      },

    ],
  },
  {
    path: '*',
    element: <ErrorPage />,
  },

]);