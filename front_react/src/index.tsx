import React from 'react';

import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';

import { store } from './redux/store';
import { routerConfig } from './router/routerConfig';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);


root.render(
  <Provider store={store}>
    <RouterProvider router={routerConfig} future={{ v7_startTransition: true }} />
  </Provider>,
);

