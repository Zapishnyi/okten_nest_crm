export const baseURL = process.env.REACT_APP_BACK_BASE_URL;

export const urls = {
  auth: {
    sing_in: '/auth/sign-in',
    refresh: '/auth/refresh',
    log_out: '/auth/sign-out',
    me: '/auth/me',
  },
  orders: {
    get: '/orders',
    add_comment: (order_id: number) => `/orders/${order_id}/comment`,
  },
  admin: {
    get_all_users: `/admin/user/get-all`,
    create_user: `/admin/user/create`,
    activate_user: (id: string) => `/admin/user/${id}/activate`,
    ban_user: (id: string) => `/admin/user/${id}/ban`,
    reinstate_user: (id: string) => `/admin/user/${id}/reinstate`,
    delete_user: (id: string) => `/admin/user/${id}/delete`,
  },
  health: '/health',
};