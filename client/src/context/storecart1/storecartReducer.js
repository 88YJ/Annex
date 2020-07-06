import { DISPLAY_CART_SIDEBAR, HIDE_CART_SIDEBAR, ADD_TO_CART } from '../types';

export default (state, action) => {
 switch (action.type) {
  case DISPLAY_CART_SIDEBAR:
   return {
    ...state,
    loading: false,
    cartSidebar: true,
   };
  case HIDE_CART_SIDEBAR:
   return {
    ...state,
    loading: false,
    cartSidebar: false,
   };
  case ADD_TO_CART:
   return {
    ...state,
    gamescart: [
     ...state.gamescart,
     {
      name: action.payload.name,
      img: action.payload.img,
      backgroundimg: action.payload.backgroundimg,
      wideimg: action.payload.wideimg,
     },
    ],
   };
  default:
   return state;
 }
};
