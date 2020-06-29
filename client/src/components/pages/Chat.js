import React, { useContext, useState } from 'react';
import ChatContext from '../../context/chat/chatContext';
import AuthContext from '../../context/auth/authContext';

const Chat = () => {
 const chatContext = useContext(ChatContext);
 const { allChats, sendMessageAction } = chatContext;
 const authContext = useContext(AuthContext);
 const { user } = authContext;

 const topics = Object.keys(allChats);
 const [activeTopic] = useState(topics[0]);
 const [textValue, setTextValue] = useState('');

 function onUpdate() {}

 return (
  <div className='chat'>
   <div className='chatheader'></div>
   <div className='chatbox'>
    <ul>
     {allChats[activeTopic].map((item, i) => (
      <li key={i}>
       {item.from}
       <span>{item.msg}</span>
      </li>
     ))}
    </ul>
   </div>
   <div className='chatfooter'>
    <input
     type='text'
     className='sendingmessage'
     onChange={(e) => setTextValue(e.target.value)}
    />
    <button
     onClick={() => {
      sendMessageAction({
       from: user.name,
       msg: textValue,
       topic: activeTopic,
      });
      setTextValue('');
     }}
    >
     {' '}
     Send
    </button>
   </div>
  </div>
 );
};

export default Chat;
