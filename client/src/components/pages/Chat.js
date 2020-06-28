import React from 'react';

const Chat = () => {
 return (
  <div className='chat'>
   <div className='chatheader'></div>
   <div className='chatbox'>Hi there</div>
   <div className='chatfooter'>
    <input type='text' className='sendingmessage' value='Message' />
   </div>
  </div>
 );
};

export default Chat;
