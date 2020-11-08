import React, { useReducer } from 'react';
import { initialState, MessageReducer } from './MessageReducer';

const MessageStateContext = React.createContext();
const MessageDispatchContext = React.createContext();

export function useMessageState() {
  const context = React.useContext(MessageStateContext);
  if (context === undefined) {
    throw new Error('Messagestate must be used within a MessageProvider');
  }

  return context;
}

export function useMessageDispatch() {
  const context = React.useContext(MessageDispatchContext);
  if (context === undefined) {
    throw new Error('useMessageDispatch must be used within a MessageProvider');
  }

  return context;
}

export const MessageProvider = ({ children }) => {
  const [message, dispatch] = useReducer(MessageReducer, initialState);

  return (
    <MessageStateContext.Provider value={message}>
      <MessageDispatchContext.Provider value={dispatch}>{children}</MessageDispatchContext.Provider>
    </MessageStateContext.Provider>
  );
};
