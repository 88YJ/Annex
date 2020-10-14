import React from 'react';

import ReactEmoji from 'react-emoji';

const Message = ({ message: { text, user, profileimg, time }, name }) => {
 let isSentByCurrentUser = false;

 const trimmedName = name.trim().toLowerCase();

 if (user === trimmedName) {
  //isSentByCurrentUser = true;
 }

 return isSentByCurrentUser ? (
  <div className='messageContainer'>
   <p className='sentText'>{trimmedName}</p>
   <div className='chat-MessageBox'>
    <p className='chat-MessageText'>{ReactEmoji.emojify(text)}</p>
   </div>
  </div>
 ) : (
  <div className='chat-MessageContainer'>
   <div
    className='serverimgsmall'
    style={{ backgroundImage: `url(${profileimg})` }}
   ></div>
   <p className='chat-SentText'>{user}</p>

   <div className='chat-MessageBox'>
    <p className='chat-MessageText'>{ReactEmoji.emojify(text)}</p>
   </div>
  </div>
 );
};

export default Message;
