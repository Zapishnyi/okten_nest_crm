export const baseURL = process.env.REACT_APP_BACK_BASE_URL;

export const urls = {
  auth: {
    sing_in: '/auth/sign-in',
    refresh: '/auth/refresh',
    log_out: '/auth/sign-out',
  },
  orders: {
    get: '/orders',
    add_comment: (order_id: number) => `/orders/${order_id}/comment`,
  },
  health: '/health',
};