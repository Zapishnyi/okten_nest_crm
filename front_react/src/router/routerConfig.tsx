import { createHashRouter, Navigate } from 'react-router-dom';
import React from 'react';
import SingIn from '../pages/SingIn';
import Orders from '../pages/Orders';
import MainLayout from '../layouts/MainLayout';

export const routerConfig = createHashRouter([
  {
    path: '',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Navigate to={'/sing-in'} />,
      },
      {
        path: '/sing-in',
        element: <SingIn />,
      },
      {
        path: '/orders',
        element: <Orders />,
      },

    ],
  },
  // {
  //   path: '*',
  //   element: <ErrorPage />,
  // },
]);