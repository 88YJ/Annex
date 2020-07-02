import { SET_STORE_GAME } from '../types';

export default (state, action) => {
 switch (action.type) {
  case SET_STORE_GAME:
   return {
    ...state,
    gamepage: action.payload,
   };
  default:
   return state;
 }
};
