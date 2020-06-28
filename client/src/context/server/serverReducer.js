import { SET_CURRENT_SERVER } from "../types";

export default (state, action) => {
 switch (action.type) {
  case SET_CURRENT_SERVER:
   return {
    ...state,
    server: action.payload,
    serverLogo: action.payload.img,
   };
  default:
   return state;
 }
};
