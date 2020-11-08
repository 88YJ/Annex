import { CONNECT_SOCKET } from './types';

export const initialState = {
  socket: undefined,
};

export const SocketReducer = (initialState, action) => {
  switch (action.type) {
    case CONNECT_SOCKET:
      return {
        ...initialState,
        socket: action.payload,
      };

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};
