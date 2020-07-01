import { SET_PROFILE } from '../types';

export default (state, action) => {
 switch (action.type) {
  case SET_PROFILE:
   return {
    ...state,
    profile: action.payload,
   };
  default:
   return state;
 }
};
