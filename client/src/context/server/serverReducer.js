import {
 SET_CURRENT_SERVER,
 SET_CURRENT_CHANNEL,
 DISPLAY_SERVER_SIDEBARS,
 HIDE_SERVER_SIDEBARS,
 GET_SERVER_USERLIST,
 GET_SERVER_CHANNELLIST,
} from '../types';

export default (state, action) => {
 switch (action.type) {
  case SET_CURRENT_SERVER:
   return {
    ...state,
    server: action.payload,
    serverLogo: action.payload.img,
   };
  case SET_CURRENT_CHANNEL:
   return {
    ...state,
    channel: action.payload,
   };
  case DISPLAY_SERVER_SIDEBARS:
   return {
    ...state,
    serverSidebar: true,
   };
  case HIDE_SERVER_SIDEBARS:
   return {
    ...state,
    serverSidebar: false,
   };
  case GET_SERVER_USERLIST:
   return {
    ...state,
    serverUserList: action.payload,
   };
  case GET_SERVER_CHANNELLIST:
   return {
    ...state,
    serverChannelList: action.payload,
   };
  default:
   return state;
 }
};
