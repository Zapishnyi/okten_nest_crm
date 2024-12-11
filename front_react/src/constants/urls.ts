export const baseURL = process.env.REACT_APP_BACK_BASE_URL;

export const urls = {
  auth: {
    sing_in: '/auth/sign-in',
    refresh: '/auth/refresh',
    log_out: '/auth/sign-out',
  },
  orders: '/orders',
  health: '/health',
};