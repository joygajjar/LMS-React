// src/redux/action.js

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT = 'LOGOUT';

export const loginSuccess = (success_payload) => ({  type: LOGIN_SUCCESS,  payload: success_payload})

export const logout = () => {
  return {
    type: LOGOUT,
  };
};
