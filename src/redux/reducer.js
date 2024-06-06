// // src/redux/reducer.js

// import { LOGIN_SUCCESS, LOGOUT } from './action';

// const initialState = {
//   token: '',
//   user: {
//     contactNo: '',
//     email: ''
//   }
// };

// const authReducer = (state = initialState, action) => {
//   console.log(action.type)
//   console.log(action.payload)
//   switch (action.type) {
//     case LOGIN_SUCCESS:
//       const { token, user } = action.payload
//       console.log("Auth Reducer Token",token,user)
//       return {
//       ...state,
//       user,
//       token
//       };
//     case LOGOUT:
//       return {
//         ...state,
//         token: null,
//         user: null,
//       };
//     default:
//       return state;
//   }
// };

// export default authReducer;

// src/redux/reducer.js

import { LOGIN_SUCCESS, LOGOUT } from './action';

const initialState = {
  token: sessionStorage.getItem('token') || '', // Initialize token from sessionStorage if available
  
  user: {
    contactNo: sessionStorage.getItem('contactNo') || '',
    email: sessionStorage.getItem('email') || '',
  }
};

const authReducer = (state = initialState, action) => {
  console.log(action.type);
  console.log(action.payload);
  switch (action.type) {
    case LOGIN_SUCCESS:
      const { token, user } = action.payload;
      console.log("Auth Reducer Token", token, user);
      sessionStorage.setItem('token', token); // Save token to sessionStorage
      sessionStorage.setItem('contactNo', user.contactNo); // Store contactNo in sessionStorage
      sessionStorage.setItem('email', user.email); // Store email in sessionStorage
      return {
        ...state,
        user,
        token
      };
    case LOGOUT:
      sessionStorage.removeItem('token'); // Clear token from sessionStorage
      return {
        ...state,
        token: '',
        user: {
          contactNo: '',
          email: ''
        },
      };
    default:
      return state;
  }
};

export default authReducer;

