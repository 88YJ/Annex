import React, { useState, useContext, useEffect } from 'react';

import io from 'socket.io-client';
import AuthContext from '../../context/auth/authContext';
import ProfileContext from '../../context/profile/profileContext';

import Messages from '../chatbox/Messages';
import Input from '../chatbox/Input';

import '../chatcss/Chat.css';

let socket;

const DMChat = ({ location }) => {
 const authContext = useContext(AuthContext);

 const profileContext = useContext(ProfileContext);

 const { user } = authContext;

 const { profile } = profileContext;

 const [name, setName] = useState('');
 const [room, setRoom] = useState('');
 const [profileimg, setprofileimg] = useState('');
 const [users, setUsers] = useState('');
 const [message, setMessage] = useState('');
 const [messages, setMessages] = useState([]);
 const ENDPOINT = ':5002';

 useEffect(() => {
  //const { name } = queryString.parse(location.search);

  let chatdir = [user._id, profile._id];

  console.log(chatdir);

  let name = user.name;
  let profileimg = user.profilePicture;
  let room = chatdir;

  socket = io(ENDPOINT);

  setRoom(room);
  setName(name);
  setprofileimg(profileimg);

  socket.emit('join', { name, room, profileimg }, (error) => {
   if (error) {
    alert(error);
   }
  });
 }, [ENDPOINT, location.search]);

 useEffect(() => {
  socket.on('message', (message) => {
   setMessages((messages) => [...messages, message]);
  });

  socket.on('roomData', ({ users }) => {
   setUsers(users);
  });
 }, []);

 const sendMessage = (event) => {
  event.preventDefault();

  if (message) {
   socket.emit('sendMessage', message, () => setMessage(''));
  }
 };

 useEffect(() => {
  authContext.loadUser();
  // eslint-disable-next-line
 }, []);

 return (
  <div>
   <div className='outerContainer'>
    <div className='container'>
     <Messages messages={messages} name={name} />
     <Input
      message={message}
      setMessage={setMessage}
      sendMessage={sendMessage}
     />
    </div>
   </div>
  </div>
 );
};

export default DMChat;

/* <ul>
    {
     <li key={server._id}>
      <div
       className='dashimg'
       style={{
        backgroundImage: `url(${server.img})`,
       }}
      ></div>
      <h3 className='center'>{server.name}</h3>
     </li>
    }
   </ul>*/
