import { GET_PROFILE } from '../types';

export default (state, action) => {
 switch (action.type) {
  case GET_PROFILE:
   return {
    ...state,
    profiles: action.payload,
    loading: false,
   };
  default:
   return state;
 }
};
