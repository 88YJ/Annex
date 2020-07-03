import { GET_STORE_GAMES } from '../types';

export default (state, action) => {
 switch (action.type) {
  case GET_STORE_GAMES:
   return {
    ...state,
    storegames: action.payload,
    loading: false,
   };
  default:
   return state;
 }
};
