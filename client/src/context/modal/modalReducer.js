import { SHOW_MODAL_WITH_ADD_SERVER, HIDE_MODAL } from "../types";

export default (state, action) => {
 switch (action.type) {
  case SHOW_MODAL_WITH_ADD_SERVER:
   return {
    ...state,
    show: true,
    addServer: true,
   };
  case HIDE_MODAL:
   return {
    ...state,
    show: false,
    addServer: false,
   };
  default:
   return state;
 }
};
