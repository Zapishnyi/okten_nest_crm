export const baseURL = process.env.REACT_APP_BACK_BASE_URL;

export const urls = {
  auth: {
    sing_in: '/auth/sign-in',
    refresh: '/auth/refresh',
    log_out: '/auth/sign-out',
    activate: '/auth/activate',
    me: '/auth/me',
  },
  orders: {
    get_all: '/orders',
    get_one: (order_id: number) => `/orders/${order_id}`,
    add_comment: (order_id: number) => `/orders/${order_id}/comment`,
  },
  admin: {
    get_all_users: `/admin/user/get-all`,
    create_user: `/admin/user/create`,
    activate_user: (id: string) => `/admin/user/${id}/activate`,
    ban_reinstate_user: (id: string) => `/admin/user/${id}/ban-reinstate`,
    delete_user: (id: string) => `/admin/user/${id}/delete`,
    get_orders_status_statistic: `/admin/orders/statistic`,
  },
  health: '/health',
};