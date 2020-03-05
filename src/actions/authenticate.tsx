export const types = {
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
};

/**
 * Return LOGIN action if param is true, otherwise LOGOUT
 */
export const authenticate = (isLogin) => ({
  type: isLogin ? types.LOGIN : types.LOGOUT,
})
