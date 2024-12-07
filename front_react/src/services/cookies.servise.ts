import { setCookieExpire } from '../helpers/cookie-expire';

interface ICookiesService {
  setAccessToken: (token: string) => void;
  setRefreshToken: (token: string) => void;
  getAccessToken: () => string | null;
  getRefreshToken: () => string | null;
}


export const cookie: ICookiesService = {
  setAccessToken: (token) => document.cookie = `access=${token}; path=/; ${setCookieExpire(1)};`,
  setRefreshToken: (token) => document.cookie = `refresh=${token}; path=/; ${setCookieExpire(30)};`,
  getAccessToken: () => {
    const match = document.cookie.match(/(?<=access=)\S+(?=;)/);
    return match ? match[0] : null;
  },
  getRefreshToken: () => {
    const match = document.cookie.match(/(?<=refresh=)\S+(?=;)/);
    return match ? match[0] : null;
  },
};