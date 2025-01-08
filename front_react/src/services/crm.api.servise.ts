import axios from 'axios';

import { baseURL, urls } from '../constants/urls';
import { navigateTo } from '../helpers/navigate-to';
import IActivateToken from '../interfaces/IActivateToken';
import IAuthTokens from '../interfaces/IAuthTokens';
import IComment from '../interfaces/IComment';
import { IHealth } from '../interfaces/IHealth';
import IOrder from '../interfaces/IOrder';
import IOrderPaginated from '../interfaces/IOrderPaginated';
import IOrdersStatusStatistic from '../interfaces/IOrdersStatusStatistic';
import IUser from '../interfaces/IUser';
import IUserActivate from '../interfaces/IUserActivate';
import { IUserCreate } from '../interfaces/IUserCreate';
import IUserSignIn from '../interfaces/IUserSignIn';
import { UsersActions } from '../redux/Slices/usersSlice';
import { store } from '../redux/store';

import { cookie } from './cookies.servise';

const axiosInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use((request) => {
  let token: string | null;
  switch (request.url) {
    case '/auth/refresh':
      token = cookie.getRefreshToken();
      break;
    case '/auth/activate':
      token = cookie.getActivateToken();
      break;
    default :
      token = cookie.getAccessToken();
  }
  request.headers.Authorization = `Bearer ${token}`;
  return request;
});

interface ICRMApiService {
  auth: {
    singIn: (body: IUserSignIn) => Promise<IAuthTokens>;
    refresh: () => Promise<IAuthTokens>;
    log_out: () => Promise<void>;
    activate: (body: IUserActivate) => Promise<IUser>;
    me: () => Promise<IUser>;
  };
  orders: {
    get_all: (query: Record<string, string>) => Promise<IOrderPaginated>;
    get_one: (order_id: number) => Promise<IOrder>
    add_comment: (order_id: number, body: IComment) => Promise<IOrder>;
  };
  admin: {
    get_all_users: (query: Record<string, string>) => Promise<IUser[]>,
    create_user: (dto: IUserCreate) => Promise<IUser>,
    activate_user: (id: string) => Promise<IActivateToken>,
    ban_reinstate_user: (id: string) => Promise<IUser>,
    delete_user: (id: string) => Promise<void>,
    get_orders_status_statistic: () => Promise<IOrdersStatusStatistic>
  },
  health: () => Promise<IHealth>;

}

export const CRMApi: ICRMApiService = {
  auth: {
    singIn: (body) => axiosInstance
      .post(urls.auth.sing_in, body)
      .then((response) => response.data),
    refresh: () => axiosInstance.post(urls.auth.refresh).then((response) => response.data),
    log_out: () => axiosInstance.post(urls.auth.log_out),
    activate: (body) => axiosInstance
      .post(urls.auth.activate, body)
      .then((response) => response.data),
    me: () => axiosInstance.get(urls.auth.me).then((response) => response.data),
  },
  orders: {
    get_all: (query) => axiosInstance
      .get(urls.orders.get_all, { params: query })
      .then((response) => response.data),
    get_one: (order_id: number) => axiosInstance.get(urls.orders.get_one(order_id)).then((response) => response.data),
    add_comment: (order_id: number, body) => axiosInstance.post(urls.orders.add_comment(order_id), body).then((response) => response.data),
  },
  admin: {
    get_all_users: (query) => axiosInstance.get(urls.admin.get_all_users, { params: query }).then((response) => response.data),
    create_user: (dto) => axiosInstance.post(urls.admin.create_user, dto).then((response) => response.data),
    activate_user: (id: string) => axiosInstance.patch(urls.admin.activate_user(id)).then((response) => response.data),
    ban_reinstate_user: (id: string) => axiosInstance.patch(urls.admin.ban_reinstate_user(id)).then((response) => response.data),
    delete_user: (id: string) => axiosInstance.delete(urls.admin.delete_user(id)),
    get_orders_status_statistic: () => axiosInstance.get(urls.admin.get_orders_status_statistic).then((response) => response.data),
  },
  health: () => axiosInstance.get(urls.health).then((response) => response.data),

};

axiosInstance.interceptors.response.use((response) => response,
  async (error) => {
    const dispatch = store.dispatch;
    const originalRequest = error.config;

    if (error.status) {

      if (error.response.status === 401 && !originalRequest._retry && cookie.getRefreshToken() && originalRequest.url !== '/auth/refresh') {
        originalRequest._retry = true;
        try {
          const { tokens } = await CRMApi.auth.refresh();
          cookie.setAccessToken(tokens.access);
          cookie.setRefreshToken(tokens.refresh);
          return axiosInstance(originalRequest);
        } catch (error) {
          cookie.deleteAuthTokens();
          dispatch(UsersActions.setUser(null));
          console.error('Token refresh failed with error:', error);
          navigateTo('/auth/sign-in');
        }
      }
      return Promise.reject(error);
    } else {
      return Promise.reject(error);
    }
  });