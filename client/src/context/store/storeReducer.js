import {
 GET_STORE_GAMES,
 FILTER_STORE_GAMES,
 DISPLAY_CART_SIDEBAR,
 HIDE_CART_SIDEBAR,
 ADD_TO_CART,
 SET_STORE_GAME,
} from '../types';

export default (state, action) => {
 switch (action.type) {
  case GET_STORE_GAMES:
   return {
    ...state,
    storegames: action.payload,
    loading: false,
   };
  case FILTER_STORE_GAMES:
   return {
    ...state,
    filtered: state.storegames.filter((game) => {
     const regex = new RegExp(`${action.payload}`, 'gi');
     return game.name.match(regex);
    }),
   };
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
     {
      gameid: action.payload._id,
      name: action.payload.name,
      img: action.payload.img,
      backgroundimg: action.payload.backgroundimg,
      wideimg: action.payload.wideimg,
     },
    ],
   };
  case SET_STORE_GAME:
   return {
    ...state,
    gamepage: action.payload,
   };
  default:
   return state;
 }
};
