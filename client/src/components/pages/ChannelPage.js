import React, { useState, useContext, useEffect } from "react";
import { Redirect } from "react-router-dom";
import ServerContext from "../../context/server/serverContext";
import io from "socket.io-client";
import AuthContext from "../../context/auth/authContext";

import Messages from "../chatbox/Messages";
import Input from "../chatbox/Input";

let socket;

let red = false;

export function refresh() {
 //window.location.reload(false);
}

const ServerPage = ({ location }) => {
 const authContext = useContext(AuthContext);

 const serverContext = useContext(ServerContext);

 const { displayServerSidebars, channel } = serverContext;

 const { user } = authContext;

 const [name, setName] = useState("");
 const [users, setUsers] = useState("");
 const [message, setMessage] = useState("");
 const [messages, setMessages] = useState([]);
 const ENDPOINT = ":5002";

 useEffect(() => {
  if (socket) {
   socket.disconnect();
  }
  let name;
  let profileimg;
  let room;
  if (user) {
   name = user.name;
   profileimg = user.profilePicture;
   room = channel._id;
   red = false;
  } else {
   name = "youre not supposed to be here";
   profileimg = "lol";
   room = "haha";
   red = true;
  }
  setName(name);

  socket = io(ENDPOINT);

  socket.emit("join", { name, room, profileimg }, (error) => {
   if (error) {
    alert(error);
   }
  });
 }, [ENDPOINT, location.search]);

 if (user) {
  red = false;
 } else {
  red = true;
 }

 useEffect(() => {
  socket.on("message", (message) => {
   setMessages((messages) => [...messages, message]);
  });

  socket.on("roomData", ({ users }) => {
   setUsers(users);
  });
 }, []);

 const sendMessage = (event) => {
  event.preventDefault();

  if (message) {
   socket.emit("sendMessage", message, () => setMessage(""));
  }
 };

 useEffect(() => {
  authContext.loadUser();
  if (!channel.customization.dm) {
   displayServerSidebars();
  }
  // eslint-disable-next-line
 }, []);
 if (red) {
  console.log("nothing to return");
  return <Redirect to='/' />;
 } else {
  return (
   <div
    className='chat'
    style={{ backgroundImage: `url(${channel.customization.icon})` }}
   >
    <div className='channelname'>
     <h2>{channel.name}</h2>
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
