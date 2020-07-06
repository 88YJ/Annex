import {
 SET_PROFILE,
 GET_INCOMING_FRIEND_REQUESTS,
 GET_FRIENDS_LIST,
 GET_PROFILE,
} from '../types';

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
  case GET_PROFILE:
   return {
    ...state,
    profiles: action.payload,
    loading: false,
   };
  default:
   return state;
 }
};
