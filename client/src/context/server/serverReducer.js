import {
 SET_CURRENT_SERVER,
 SET_CURRENT_CHANNEL,
 DISPLAY_SERVER_SIDEBARS,
 HIDE_SERVER_SIDEBARS,
 GET_SERVER_USERLIST,
 GET_SERVER_CHANNELLIST,
 GET_SERVERS,
 GET_USER_SERVERS,
} from "../types";

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
  case GET_SERVERS:
   return {
    ...state,
    servers: action.payload,
    loading: false,
   };
  case GET_USER_SERVERS:
   return {
    ...state,
    userServerList: action.payload,
    loading: false,
   };
  default:
   return state;
 }
};
