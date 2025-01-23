export const baseURL = import.meta.env.VITE_BACK_BASE_URL;

export const urls = {
  auth: {
    sing_in: '/auth/sign-in',
    refresh: '/auth/refresh',
    log_out: '/auth/sign-out',
    activate: '/auth/activate',
    me: '/auth/me',
  },
  orders: {
    get_all: '/order/all',
    get_one: (order_id: number) => `/order/${order_id}`,
    edit_one: (order_id: number) => `/order/${order_id}`,
    add_comment: (order_id: number) => `/order/${order_id}/comment`,
  },
  admin: {
    get_all_users: `/admin/user/get-all`,
    create_user: `/admin/user/create`,
    activate_user: (id: number) => `/admin/user/${id}/activate`,
    ban_reinstate_user: (id: number) => `/admin/user/${id}/ban-reinstate`,
    delete_user: (id: number) => `/admin/user/${id}/delete`,
    get_orders_status_statistic: `/admin/orders/statistic`,
  },
  group: {
    get_all: `/group/all`,
    create: `/group`,
    delete: (id: number) => `/group/${id}`,
  },
  health: '/health',
};