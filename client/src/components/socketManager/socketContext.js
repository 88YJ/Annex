import React, { useReducer } from 'react';
import { initialState, SocketReducer } from './socketReducer';

const SocketStateContext = React.createContext();
const SocketDispatchContext = React.createContext();

export function useSocketState() {
  const context = React.useContext(SocketStateContext);
  if (context === undefined) {
    throw new Error('useSocketState must be used within a SocketProvider');
  }

  return context;
}

export function useSocketDispatch() {
  const context = React.useContext(SocketDispatchContext);
  if (context === undefined) {
    throw new Error('useSocketDispatch must be used within a SocketProvider');
  }

  return context;
}

export const SocketProvider = ({ children }) => {
  const [socket, dispatch] = useReducer(SocketReducer, initialState);

  return (
    <SocketStateContext.Provider value={socket}>
      <SocketDispatchContext.Provider value={dispatch}>{children}</SocketDispatchContext.Provider>
    </SocketStateContext.Provider>
  );
};
