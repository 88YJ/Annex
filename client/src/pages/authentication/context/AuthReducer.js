import { REGISTER_SUCCESS, REGISTER_ERROR, REQUEST_LOGIN, LOGIN_SUCCESS, LOGIN_ERROR, LOGOUT } from './types';

let user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : undefined;
let token = localStorage.getItem('token') ? localStorage.getItem('token') : undefined;
let isLoggedIn = localStorage.getItem('isLoggedIn') === 'true' ? true : false;

export const initialState = {
  user: user,
  token: token,
  isLoggedIn: isLoggedIn,
  loading: false,
};

export const AuthReducer = (initialState, action) => {
  switch (action.type) {
    case REGISTER_SUCCESS:
      return {
        ...initialState,
        loading: false,
      };
    case REGISTER_ERROR:
      return {
        ...initialState,
        loading: false,
        errorMessage: action.error,
      };
    case REQUEST_LOGIN:
      return {
        ...initialState,
        loading: true,
      };
    case LOGIN_SUCCESS:
      return {
        ...initialState,
        user: action.payload.user,
        token: action.payload.token,
        loading: false,
        isLoggedIn: true,
      };
    case LOGIN_ERROR:
      return {
        ...initialState,
        loading: false,
        errorMessage: action.error,
      };
    case LOGOUT:
      return {
        ...initialState,
        user: '',
        token: '',
        isLoggedIn: false,
      };

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};
