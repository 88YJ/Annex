import React, { useState, useEffect, useContext } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
import AuthContext from '../../context/auth/authContext';

import TextContainer from './TextContainer';
import Messages from './Messages';
import InfoBar from './InfoBar';
import Input from './Input';

import '../chatcss/Chat.css';
import { connect } from 'mongoose';

let socket;

const Chat = ({ location }) => {
 const authContext = useContext(AuthContext);

 const { user } = authContext;

 const [name, setName] = useState('');
 const [room, setRoom] = useState('');
 const [profileimg, setprofileimg] = useState('');
 const [users, setUsers] = useState('');
 const [message, setMessage] = useState('');
 const [messages, setMessages] = useState([]);
 const ENDPOINT = ':5002';

 useEffect(() => {
  //const { name } = queryString.parse(location.search);

  let name = user.name;
  let profileimg = user.profilePicture;
  let room = 'whoo';

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

 return (
  <div className='outerContainer'>
   <div className='container'>
    <InfoBar room={room} />
    <Messages messages={messages} name={name} />
    <Input
     message={message}
     setMessage={setMessage}
     sendMessage={sendMessage}
    />
   </div>
   <TextContainer users={users} />
  </div>
 );
};

export default Chat;
