export const baseURL = process.env.REACT_APP_BACK_BASE_URL;

export const urls = {
  auth: {
    sing_in: '/auth/sing-in',
    refresh: '/auth/refresh',
  },
  orders: (query: string) => `/orders?${query}`,
  health: '/health',
};