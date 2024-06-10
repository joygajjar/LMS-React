export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT = 'LOGOUT';

export const loginSuccess = (success_payload) => ({
  type: LOGIN_SUCCESS,
    payload: success_payload
  })


export const logout = () => {
  sessionStorage.removeItem('token'); // Remove token from sessionStorage
  return {
    type: LOGOUT,
  };
};

export const setAuthenticated = (isAuthenticated) => ({
  type: 'SET_AUTHENTICATED',
  payload: isAuthenticated,
});
