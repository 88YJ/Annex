import {
 SET_PROFILE,
 GET_INCOMING_FRIEND_REQUESTS,
 GET_FRIENDS_LIST,
} from "../types";

export default (state, action) => {
 switch (action.type) {
  case SET_PROFILE:
   return {
    ...state,
    profile: action.payload,
   };
  case GET_INCOMING_FRIEND_REQUESTS:
   return {
    ...state,
    incomingRequests: action.payload,
   };
  case GET_FRIENDS_LIST:
   return {
    ...state,
    friendList: action.payload,
   };
  default:
   return state;
 }
};
