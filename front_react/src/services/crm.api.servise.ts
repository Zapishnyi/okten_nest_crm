import axios from 'axios';
import { baseURL, urls } from '../constants/urls';
import IUserSingIn from '../interfaces/IUserSingIn';
import IOrderPaginated from '../interfaces/IOrderPaginated';
import { IHealth } from '../interfaces/IHealth';
import IAuthTokens from '../interfaces/IAuthTokens';
import { cookie } from './cookies.servise';
import { navigateTo } from '../helpers/navigate-to';


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
    singIn: (body: IUserSingIn) => Promise<IAuthTokens>;
    refresh: () => Promise<IAuthTokens>;
    log_out: () => Promise<void>;
  };
  orders: {
    get: (query: Record<string, string>) => Promise<IOrderPaginated>;
  };
  health: () => Promise<IHealth>;

}

export const CRMApi: ICRMApiService = {
  auth: {
    singIn: (body: IUserSingIn) => axiosInstance
      .post(urls.auth.sing_in, body)
      .then((response) => response.data),
    refresh: () => axiosInstance.post(urls.auth.refresh).then((response) => response.data),
    log_out: () => axiosInstance.post(urls.auth.log_out),
  },
  orders: {
    get: (query) => axiosInstance
      .get(urls.orders, { params: query })
      .then((response) => response.data),
  },
  health: () => axiosInstance.get(urls.health).then((response) => response.data),

};

axiosInstance.interceptors.response.use((response) => response,
  async (error) => {
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
          console.error('Token refresh failed', error);
          navigateTo('/sign-in');
        }
      }
      return Promise.reject(error);
    } else {
      return Promise.reject(error);
    }
  });