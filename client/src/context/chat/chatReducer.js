import { GET_MESSAGE } from '../types';

export default (state, action) => {
 switch (action.type) {
  case GET_MESSAGE:
   return {
    ...state,
    [action.payload.topic]: [
     ...state[action.payload.topic],
     { from: action.payload.from, msg: action.payload.msg },
    ],
   };
  default:
   return state;
 }
};
