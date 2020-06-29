import React, { useReducer, useContext } from 'react';
import uuid from 'uuid';
import ChatContext from './chatContext';
import chatReducer from './chatReducer';
import { GET_MESSAGE } from '../types';
import io from 'socket.io-client';

let run = false;
let socket;
function sendMessageAction(value) {
 socket.emit('chat message', value);
}

const ChatState = (props) => {
 const initialState = {
  topic1: [
   { from: 'use1', msg: 'hi' },
   { from: 'use2', msg: 'hello' },
   { from: 'use3', msg: 'I’d like you to…' },
  ],
  topic2: [
   { from: 'use5', msg: 'Are you sure…?' },
   { from: 'use2', msg: 'I cannot wait to…' },
   { from: 'use3', msg: 'I dare say…' },
  ],
 };
 const [allChats, dispatch] = useReducer(chatReducer, initialState);

 if (!socket) {
  socket = io(':5001');
 } else if (run == false) {
  socket.on('chat message', function (msg) {
   dispatch({ type: GET_MESSAGE, payload: msg });
  });
  run = true;
 }

 return (
  <ChatContext.Provider
   value={{
    allChats,
    sendMessageAction,
   }}
  >
   {props.children}
  </ChatContext.Provider>
 );
};

export default ChatState;
