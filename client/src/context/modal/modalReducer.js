import {
 SHOW_MODAL_WITH_ADD_SERVER,
 SHOW_MODAL_WITH_ADD_CHANNEL,
 SHOW_MODAL_WITH_EDIT_PROFILE,
 SHOW_MODAL_WITH_SCREENSHOT,
 HIDE_MODAL,
} from '../types';

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
  case SHOW_MODAL_WITH_EDIT_PROFILE:
   return {
    ...state,
    show: true,
    editProfile: true,
   };
  case SHOW_MODAL_WITH_SCREENSHOT:
   return {
    ...state,
    show: true,
    screenShot: true,
    screenShotLink: action.payload,
   };
  case HIDE_MODAL:
   return {
    ...state,
    show: false,
    addServer: false,
    addChannel: false,
    startStream: false,
    editProfile: false,
    screenShot: false,
   };
  default:
   return state;
 }
};
