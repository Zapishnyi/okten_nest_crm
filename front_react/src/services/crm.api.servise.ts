import axios from 'axios';
import { baseURL, urls } from '../constants/urls';
import IUserSingIn from '../interfaces/IUserSingIn';
import { storage } from './localStorage.servise';
import IOrderPaginated from '../interfaces/IOrderPaginated';
import { IHealth } from '../interfaces/IHealth';
import IAuthTokens from '../interfaces/IAuthTokens';


const axiosInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use((request) => {
  let accessToken = storage.getAccessToken();
  accessToken
    ? (request.headers.Authorization = `Bearer ${accessToken}`)
    : console.log('NO TOKEN');
  return request;
});

interface ICRMApiService {
  auth: {
    singIn: (body: IUserSingIn) => Promise<IAuthTokens>;
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
  },
  orders: {
    get: (query) => axiosInstance
      .get(urls.orders, { params: query })
      .then((response) => response.data),
  },
  health: () => axiosInstance.get(urls.health).then((response) => response.data),

};