import { LOGIN_SUCCESS, LOGOUT,LOGIN_FAILURE } from './action';

 

const initialState = {

  token: sessionStorage.getItem('token') || '', // Initialize token from sessionStorage if available

  isAuthenticated: sessionStorage.getItem('token') ? true : false, // Check if token exists
  

  user: {

    contactNo: sessionStorage.getItem('contactNo') || '',

    email: sessionStorage.getItem('email') || '',
  
    isLocked:sessionStorage.getItem('isLocked') 
    }

};

 

const authReducer = (state = initialState, action) => {

  switch (action.type) {

    case LOGIN_SUCCESS:

      const { token, user } = action.payload;

      sessionStorage.setItem('token', token); // Save token to sessionStorage

      sessionStorage.setItem('contactNo', user.contactNo); // Store contactNo in sessionStorage

      sessionStorage.setItem('email', user.email);
      
      sessionStorage.setItem('isLocked', user.isLocked);// Store email in sessionStorage
    

      return {

        ...state,

        user,

        token,

        isAuthenticated: true
    

      };

    case LOGOUT:

      sessionStorage.removeItem('token'); // Remove token from sessionStorage

      sessionStorage.removeItem('contactNo'); // Remove contactNo from sessionStorage

      sessionStorage.removeItem('email'); // Remove email from sessionStorage

      sessionStorage.removeItem('isLocked'); // Remove email from sessionStorage

      return {

        ...state,

        token: null,

        isAuthenticated: false,

        user: null,



      };

      case LOGIN_FAILURE: // Handle login failure
      sessionStorage.removeItem('token'); // Clear any existing token
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        user: null, // Optionally clear user data as well
      };

    default:

      return state;

  }

};

 

export default authReducer;

