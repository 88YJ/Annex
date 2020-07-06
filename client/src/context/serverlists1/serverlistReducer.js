import { GET_USER_SERVERS } from "../types";

export default (state, action) => {
 switch (action.type) {
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
