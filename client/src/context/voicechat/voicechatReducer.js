import {
 SET_CURRENT_VOICE_CHANNEL,
 SET_VOICE_STREAM,
 UPDATE_VOICE_CHAT_USERLIST,
 UPDATE_PEER_CONNECTIONS,
 UPDATE_LOCAL_ID,
 SET_RECEIVING_CALL,
 SET_CALLER,
 SET_CALLER_SIGNAL,
 SET_CALL_ACCEPTED,
} from "../types";

export default (state, action) => {
 switch (action.type) {
  case SET_CURRENT_VOICE_CHANNEL:
   return {
    ...state,
    channelID: action.payload,
   };
  case UPDATE_PEER_CONNECTIONS:
   return {
    ...state,
    peerConnections: action.payload,
   };

  case UPDATE_VOICE_CHAT_USERLIST:
   let alreadyInChannel = false;
   state.userList.forEach((user) => {
    if (user.id == action.payload.id) {
     alreadyInChannel = true;
     return;
    }
   });
   if (!alreadyInChannel) {
    return {
     ...state,
     userList: [...state.userList, action.payload],
    };
   }
  case UPDATE_LOCAL_ID:
   return {
    ...state,
    localID: action.payload,
   };
  case SET_VOICE_STREAM:
   return {
    ...state,
    stream: action.payload,
   };

  case SET_RECEIVING_CALL:
   return {
    ...state,
    receivingCall: action.payload,
   };
  case SET_CALLER:
   return {
    ...state,
    caller: action.payload,
   };
  case SET_CALLER_SIGNAL:
   return {
    ...state,
    callerSignal: action.payload,
   };
  case SET_CALL_ACCEPTED:
   return {
    ...state,
    callAccepted: action.payload,
   };

  default:
   return state;
 }
};
