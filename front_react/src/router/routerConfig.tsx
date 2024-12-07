import { createHashRouter, Navigate } from 'react-router-dom';
import React from 'react';
import SingIn from '../pages/SingIn/SingIn';
import Orders from '../pages/Orders/Orders';
import MainLayout from '../layouts/MainLayout';

export const routerConfig = createHashRouter([
  {
    path: '',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Navigate to={'/orders'} />,
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