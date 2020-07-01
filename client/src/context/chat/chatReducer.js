import { SET_CONNECT_TRUE, SET_CONNECT_FALSE, INITIAL_CONNECT } from '../types';

export default (state, action) => {
 switch (action.type) {
  case SET_CONNECT_TRUE:
   return {
    ...state,
    connect: true,
   };
  case SET_CONNECT_FALSE:
   return {
    ...state,
    connect: false,
   };
  case INITIAL_CONNECT:
   return {
    ...state,
    connected: true,
   };

  default:
   return state;
 }
};
