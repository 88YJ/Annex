import { GET_GAMES, DISPLAY_GAMES_SIDEBAR } from "../types";

export default (state, action) => {
 switch (action.type) {
  case GET_GAMES:
   return {
    ...state,
    games: action.payload,
    loading: false,
   };
  case DISPLAY_GAMES_SIDEBAR:
   return {
    ...state,
    loading: false,
    gamesSidebar: true,
   };
  default:
   return state;
 }
};
