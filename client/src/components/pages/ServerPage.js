import React, { useState, useContext, useEffect } from 'react';

import ServerContext from '../../context/server/serverContext';
import io from 'socket.io-client';
import AuthContext from '../../context/auth/authContext';

import Messages from '../chatbox/Messages';
import Input from '../chatbox/Input';

let socket;

let red = false;

export function refresh() {
 //window.location.reload(false);
}

const ServerPage = ({ location }) => {
 const authContext = useContext(AuthContext);

 const serverContext = useContext(ServerContext);

 const { server, displayServerSidebars } = serverContext;

 const { user } = authContext;

 const [name, setName] = useState('');
 const [room, setRoom] = useState('');
 const [profileimg, setprofileimg] = useState('');
 const [users, setUsers] = useState('');
 const [message, setMessage] = useState('');
 const [messages, setMessages] = useState([]);
 const ENDPOINT = ':5002';

 useEffect(() => {
  if (socket) {
   socket.disconnect();
  }
  let name;
  let profileimg;
  let room;

  //const { name } = queryString.parse(location.search);
  if (user) {
   name = user.name;
   profileimg = user.profilePicture;
   room = server._id;
   red = false;
  } else {
   name = 'youre not supposed to be here';
   profileimg = 'lol';
   room = 'haha';
   red = true;
  }

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
  displayServerSidebars();
  // eslint-disable-next-line
 }, []);
 if (red) {
  console.log('nothing to return');
  return <div></div>;
 } else {
  return (
   <div className='chat' style={{ backgroundImage: `url(${server.img})` }}>
    <div className='channelname'>
     <h1>{server.name}</h1>
    </div>
    <div className='chatbox'>
     <div className='chatcontainer'>
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
 }
};

export default ServerPage;

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
