import React, { useContext, useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";
import ServerContext from "../../context/server/serverContext";
import ModalContext from "../../context/modal/modalContext";
import ProfileContext from "../../context/profile/profileContext";
import ChatContext from "../../context/chat/chatContext";
import VoicechatContext from "../../context/voicechat/voicechatContext";

const LeftSidebar = () => {
 const authContext = useContext(AuthContext);

 const serverContext = useContext(ServerContext);

 const modalContext = useContext(ModalContext);

 const profileContext = useContext(ProfileContext);

 const voicechatContext = useContext(VoicechatContext);

 const {
  server,
  serverSidebar,
  serverChannelList,
  setCurrentChannel,
 } = serverContext;

 const { user } = authContext;

 const chatContext = useContext(ChatContext);

 const { showModalWithAddChannel } = modalContext;

 const { setConnectTrue, connect } = chatContext;

 const { getFriendsList, friendList } = profileContext;

 const {
  receivingCall,
  caller,
  userList,
  acceptCall,
  callPeer,
  localID,
  stream,
  callAccepted,
  userVideo,
  partnerVideo,
 } = voicechatContext;

 //const [stream, setStream] = useState();

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

 function openVoiceChannel(channel) {
  //setCurrentVoiceChannel(channel);
  //console.log("HERE" + peerConnections.id);
 }
 let name;
 //const { name } = queryString.parse(location.search);
 if (user) {
  name = user.name;
 } else {
  name = "youre not supposed to be here";
 }

 //const audioStream = (voiceStream) => ()

 let UserVideo;
 if (stream) {
  UserVideo = (
   <video
    style={{ display: "none" }}
    playsInline
    muted
    ref={userVideo}
    autoPlay
   />
  );
 }

 let PartnerVideo;
 if (callAccepted) {
  PartnerVideo = (
   <video playsInline style={{ display: "none" }} ref={partnerVideo} autoPlay />
  );
 }

 let incomingCall;
 if (receivingCall) {
  incomingCall = (
   <div>
    <h1>{caller} is calling you</h1>
    <button onClick={acceptCall}>Accept</button>
   </div>
  );
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
      <li style={{ display: "none" }}>
       {UserVideo}
       {PartnerVideo}
      </li>
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
      <li>
       {Object.keys(userList).map((key) => {
        if (key === localID) {
         return null;
        }
        return <button onClick={() => callPeer(key)}>Call {key}</button>;
       })}
      </li>
      <li>{incomingCall}</li>
     </ul>
    </div>
    <div className='serverchannels'></div>
   </div>
  );
 }
};
/*

 return (
  <ul>
   <li>
    {UserVideo}
    {PartnerVideo}
   </li>
   <li>
    {Object.keys(userList).map((key) => {
     if (key === localID) {
      return null;
     }
     return <button onClick={() => callPeer(key)}>Call {key}</button>;
    })}
   </li>
   <li>{incomingCall}</li>
  </ul>
 );
};



{channel.voiceChannel ? (
    <div>
     <Link onClick={() => openVoiceChannel(channel)}>{channel.name} </Link>
     <ul>
      {userList.length >= 1 ? (
       userList.map((user, i) => <li key={i}>{user.name}</li>)
      ) : (
       <div></div>
      )}
     </ul>
    </div>
   ) : (
    <Link to='/redirectchat' onClick={() => openChannel(channel)}>
     {channel.name}{" "}
    </Link>
   )}
*/
export default LeftSidebar;
