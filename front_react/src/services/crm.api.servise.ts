import axios from 'axios';
import { baseURL, urls } from '../constants/urls';
import IUserSignIn from '../interfaces/IUserSignIn';
import IOrderPaginated from '../interfaces/IOrderPaginated';
import { IHealth } from '../interfaces/IHealth';
import IAuthTokens from '../interfaces/IAuthTokens';
import { cookie } from './cookies.servise';
import { navigateTo } from '../helpers/navigate-to';
import { store } from '../redux/store';
import ICommentResponse from '../interfaces/ICommentResponse';
import IComment from '../interfaces/IComment';
import IUser from '../interfaces/IUser';
import { IUserCreate } from '../interfaces/IUserCreate';
import { UsersActions } from '../redux/Slices/usersSlice';


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
    me: () => Promise<IUser>;
  };
  orders: {
    get: (query: Record<string, string>) => Promise<IOrderPaginated>;
    add_comment: (order_id: number, body: IComment) => Promise<ICommentResponse>;
  };
  admin: {
    get_all_users: (query: Record<string, string>) => Promise<IUser[]>,
    create_user: (dto: IUserCreate) => Promise<IUser>,
    activate_user: (id: string) => Promise<IUser>,
    ban_user: (id: string) => Promise<IUser>,
    reinstate_user: (id: string) => Promise<IUser>,
    delete_user: (id: string) => Promise<void>,
  },
  health: () => Promise<IHealth>;

}

export const CRMApi: ICRMApiService = {
  auth: {
    singIn: (body: IUserSignIn) => axiosInstance
      .post(urls.auth.sing_in, body)
      .then((response) => response.data),
    refresh: () => axiosInstance.post(urls.auth.refresh).then((response) => response.data),
    log_out: () => axiosInstance.post(urls.auth.log_out),
    me: () => axiosInstance.get(urls.auth.me).then((response) => response.data),
  },
  orders: {
    get: (query) => axiosInstance
      .get(urls.orders.get, { params: query })
      .then((response) => response.data),
    add_comment: (order_id: number, body) => axiosInstance.post(urls.orders.add_comment(order_id), body).then((response) => response.data),
  },
  admin: {
    get_all_users: (query) => axiosInstance.get(urls.admin.get_all_users, { params: query }).then((response) => response.data),
    create_user: (dto) => axiosInstance.post(urls.admin.create_user, dto).then((response) => response.data),
    activate_user: (id: string) => axiosInstance.patch(urls.admin.activate_user(id)).then((response) => response.data),
    ban_user: (id: string) => axiosInstance.patch(urls.admin.ban_user(id)).then((response) => response.data),
    reinstate_user: (id: string) => axiosInstance.patch(urls.admin.reinstate_user(id)).then((response) => response.data),
    delete_user: (id: string) => axiosInstance.delete(urls.admin.delete_user(id)),
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
          console.error('Token refresh failed', error);
          navigateTo('/auth/sign-in');
        }
      }
      return Promise.reject(error);
    } else {
      return Promise.reject(error);
    }
  });