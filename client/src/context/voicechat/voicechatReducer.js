import { SET_CURRENT_VOICE_CHANNEL } from "../types";

export default (state, action) => {
 switch (action.type) {
  case SET_CURRENT_VOICE_CHANNEL:
   return {
    ...state,
    voiceChannel: action.payload,
   };
  default:
   return state;
 }
};
