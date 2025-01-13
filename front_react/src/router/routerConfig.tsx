import React from 'react';

import { createHashRouter, Navigate } from 'react-router-dom';

import AuthLayout from '../layouts/AuthLayout/AuthLayout';
import MainLayout from '../layouts/MainLayout/MainLayout';
import Activate from '../pages/Activate/Activate';
import Admin from '../pages/Admin/Admin';
import ErrorPage from '../pages/ErrorPage/ErrorPage';
import Orders from '../pages/Orders/Orders';
import SignIn from '../pages/SignIn/SignIn';

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
        path: 'activate/:activate_token',
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
    path: 'error',
    element: <ErrorPage />,
  },
  {
    path: '*',
    element: <ErrorPage />,
  },

]);