export const types = {
  AUTHENTICATE: 'AUTHENTICATE',
};

export const authenticate = (payload) => ({
  type: types.AUTHENTICATE,
  payload
})