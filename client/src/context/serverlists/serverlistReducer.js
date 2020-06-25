import { GET_SERVERS } from '../types';

export default (state, action) => {
 switch (action.type) {
  case GET_SERVERS:
   return {
    ...state,
    servers: action.payload,
    loading: false,
   };
  default:
   return state;
 }
};
