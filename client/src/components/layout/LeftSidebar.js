import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";
import ServerContext from "../../context/server/serverContext";
import ModalContext from "../../context/modal/modalContext";
import ProfileContext from "../../context/profile/profileContext";
import ChatContext from "../../context/chat/chatContext";

const LeftSidebar = () => {
 const authContext = useContext(AuthContext);

 const serverContext = useContext(ServerContext);

 const modalContext = useContext(ModalContext);

 const profileContext = useContext(ProfileContext);

 const { getFriendsList, friendList } = profileContext;

 const {
  server,
  serverSidebar,
  serverChannelList,
  setCurrentChannel,
 } = serverContext;

 const { showModalWithAddChannel } = modalContext;

 const chatContext = useContext(ChatContext);

 const { setConnectTrue, connect } = chatContext;

 useEffect(() => {
  authContext.loadUser();
  getFriendsList();
  // eslint-disable-next-line
 }, []);

 const displayModal = () => {
  showModalWithAddChannel();
 };

 function openChannel(channel) {
  setCurrentChannel(channel);
  if (!connect) {
   setConnectTrue();
  }
 }

 if (serverSidebar) {
  return (
   <div className='channellist'>
    <div className='serverchannels'>
     <h3 className='center'>{server.name}</h3>
     <ul>
      <li>
       <Link to='/serverlanding'>Landing Page</Link>
      </li>
      {serverChannelList.map((channel, i) => (
       <li key={i}>
        <Link to='/redirectchat' onClick={() => openChannel(channel)}>
         {channel.name}{" "}
        </Link>
       </li>
      ))}
      <li key='addServer' onClick={displayModal}>
       <div
        className='serverimgsmall'
        style={{
         backgroundImage: "url('https://img.icons8.com/cotton/2x/plus.png')",
        }}
       ></div>
      </li>
     </ul>
    </div>
   </div>
  );
 } else {
  return (
   <div>
    <div className='channellist'>
     <h3 className='center'>Friends:</h3>
     <ul>
      {friendList.map((friend, i) => (
       <li
        key={i}
        style={{
         backgroundImage: `url(${friend.profilePicture})`,
        }}
       >
        <Link to='/'>{friend.name}</Link>
       </li>
      ))}
     </ul>
    </div>
    <div className='serverchannels'></div>
   </div>
  );
 }
};

export default LeftSidebar;
