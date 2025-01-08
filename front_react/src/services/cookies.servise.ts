import { setCookieExpire } from '../helpers/cookie-expire';

interface ICookiesService {
  setAccessToken: (token: string) => void;
  setActivateToken: (token: string) => void;
  setRefreshToken: (token: string) => void;
  getAccessToken: () => string | null;
  getActivateToken: () => string | null;
  getRefreshToken: () => string | null;
  deleteAuthTokens: () => void;
  deleteActivateToken: () => void;
}


export const cookie: ICookiesService = {
  setAccessToken: (token) => document.cookie = `access=${token}; path=/; ${setCookieExpire(1)};`,
  setRefreshToken: (token) => document.cookie = `refresh=${token}; path=/; ${setCookieExpire(30)};`,
  setActivateToken: (token) => document.cookie = `activate=${token}; path=/; ${setCookieExpire(1)};`,
  getAccessToken: () => {
    const token = document.cookie.split('; ').filter(e => e.includes('access'))[0]?.replace('access=', '');
    return !!token ? token : null;
  },
  getRefreshToken: () => {
    const token = document.cookie.split('; ').filter(e => e.includes('refresh'))[0]?.replace('refresh=', '');
    return !!token ? token : null;
  },
  getActivateToken: () => {
    const token = document.cookie.split('; ').filter(e => e.includes('activate'))[0]?.replace('activate=', '');
    return !!token ? token : null;
  },
  deleteAuthTokens: () => {
    document.cookie = `access=token; path=/; ${setCookieExpire(0)}`;
    document.cookie = `refresh=token; path=/; ${setCookieExpire(0)}`;
  },
  deleteActivateToken: () => {
    document.cookie = `activate=token; path=/; ${setCookieExpire(0)}`;
  },
};