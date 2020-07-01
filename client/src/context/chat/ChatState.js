import React, { useReducer } from 'react';
import ChatContext from './chatContext';
import chatReducer from './chatReducer';
import { SET_CONNECT_TRUE, SET_CONNECT_FALSE, INITIAL_CONNECT } from '../types';

const ChatState = (props) => {
 const initialState = {
  connect: true,
  connected: false,
 };

 const [state, dispatch] = useReducer(chatReducer, initialState);

 const setConnectTrue = async () => {
  try {
   console.log('Set Connect T');
   dispatch({ type: SET_CONNECT_TRUE });
  } catch (err) {
   console.log('Couldnt Set Connect');
  }
 };

 const setConnectFalse = async () => {
  try {
   console.log('Set Connect F');
   dispatch({ type: SET_CONNECT_FALSE });
  } catch (err) {
   console.log('Couldnt Set Connect');
  }
 };
 const setInitial = async () => {
  try {
   console.log('Set Connect S');
   dispatch({ type: INITIAL_CONNECT });
  } catch (err) {
   console.log('Couldnt Set Connect');
  }
 };

 return (
  <ChatContext.Provider
   value={{
    connect: state.connect,
    connected: state.connected,
    setConnectTrue,
    setConnectFalse,
    setInitial,
   }}
  >
   {props.children}
  </ChatContext.Provider>
 );
};

export default ChatState;
