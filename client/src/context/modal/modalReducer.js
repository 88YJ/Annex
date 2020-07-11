import {
 SHOW_MODAL_WITH_ADD_SERVER,
 SHOW_MODAL_WITH_ADD_CHANNEL,
 HIDE_MODAL,
} from "../types";

export default (state, action) => {
 switch (action.type) {
  case SHOW_MODAL_WITH_ADD_SERVER:
   return {
    ...state,
    show: true,
    addServer: true,
   };
  case SHOW_MODAL_WITH_ADD_CHANNEL:
   return {
    ...state,
    show: true,
    addChannel: true,
   };
  case HIDE_MODAL:
   return {
    ...state,
    show: false,
    addServer: false,
    addChannel: false,
    startStream: false,
   };
  default:
   return state;
 }
};
