import { createHashRouter, Navigate } from 'react-router-dom';
import React from 'react';
import SignIn from '../pages/SignIn/SignIn';
import Orders from '../pages/Orders/Orders';
import MainLayout from '../layouts/MainLayout';
import ErrorPage from '../pages/ErrorPage/ErrorPage';

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
        path: '/sign-in',
        element: <SignIn />,
      },
      {
        path: '/orders',
        element: <Orders />,
      },
      {
        path: '*',
        element: <ErrorPage />,
      },


    ],
  },
  // {
  //   path: '*',
  //   element: <ErrorPage />,
  // },
]);