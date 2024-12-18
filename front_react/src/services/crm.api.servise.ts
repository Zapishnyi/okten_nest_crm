import axios from 'axios';
import { baseURL, urls } from '../constants/urls';
import IUserSignIn from '../interfaces/IUserSignIn';
import IOrderPaginated from '../interfaces/IOrderPaginated';
import { IHealth } from '../interfaces/IHealth';
import IAuthTokens from '../interfaces/IAuthTokens';
import { cookie } from './cookies.servise';
import { navigateTo } from '../helpers/navigate-to';
import { store } from '../redux/store';
import { UserActions } from '../redux/Slices/userSlice';
import ICommentResponse from '../interfaces/ICommentResponse';
import IComment from '../interfaces/IComment';


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
  };
  orders: {
    get: (query: Record<string, string>) => Promise<IOrderPaginated>;
    add_comment: (order_id: number, body: IComment) => Promise<ICommentResponse>;
  };
  health: () => Promise<IHealth>;

}

export const CRMApi: ICRMApiService = {
  auth: {
    singIn: (body: IUserSignIn) => axiosInstance
      .post(urls.auth.sing_in, body)
      .then((response) => response.data),
    refresh: () => axiosInstance.post(urls.auth.refresh).then((response) => response.data),
    log_out: () => axiosInstance.post(urls.auth.log_out),
  },
  orders: {
    get: (query) => axiosInstance
      .get(urls.orders.get, { params: query })
      .then((response) => response.data),
    add_comment: (order_id: number, body) => axiosInstance.post(urls.orders.add_comment(order_id), body).then((response) => response.data),
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
          dispatch(UserActions.setUser(null));
          console.error('Token refresh failed', error);
          navigateTo('/sign-in');
        }
      }
      return Promise.reject(error);
    } else {
      return Promise.reject(error);
    }
  });