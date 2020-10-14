import React from 'react';

import ScrollToBottom from 'react-scroll-to-bottom';

import Message from './Message';

const Messages = ({ messages, name }) => (
 <ScrollToBottom className='chat-Messages'>
  {messages.map((message, i) => (
   <div className='chat-MessageDiv' key={i}>
    <Message message={message} name={name} />
   </div>
  ))}
 </ScrollToBottom>
);

export default Messages;
