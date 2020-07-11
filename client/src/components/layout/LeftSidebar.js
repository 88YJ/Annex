import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";
import ServerContext from "../../context/server/serverContext";
import ModalContext from "../../context/modal/modalContext";
import ProfileContext from "../../context/profile/profileContext";
import ChatContext from "../../context/chat/chatContext";
import VoicechatContext from "../../context/voicechat/voicechatContext";

let acc = false;

const LeftSidebar = () => {
 const authContext = useContext(AuthContext);

 const serverContext = useContext(ServerContext);

 const modalContext = useContext(ModalContext);

 const profileContext = useContext(ProfileContext);

 const voicechatContext = useContext(VoicechatContext);

 const chatContext = useContext(ChatContext);

 const { getFriendsList, friendList, getIdProfile } = profileContext;

 const { isAuthenticated, user } = authContext;

 const {
  server,
  serverSidebar,
  serverChannelList,
  setCurrentChannel,
 } = serverContext;

 const { showModalWithAddChannel } = modalContext;

 const { setConnectTrue, connect } = chatContext;

 const {
  receivingCall,
  acceptCall,
  stream,
  callAccepted,
  userVideo,
  partnerVideo,
  joinvoice,
  userList,
  setReceivingCall,
 } = voicechatContext;

 //const [stream, setStream] = useState();
 //console.log(userList);

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
 function openDM(friend) {
  let connection = [user._id, friend._id];
  let members = [user.name, friend.name];
  let channelID = connection.sort();
  let channel = {
   name: members.toString(),
   _id: channelID.toString(),
   customization: {
    icon: friend.backgroundPicture,
    dm: true,
   },
  };
  setCurrentChannel(channel);
  if (!connect) {
   setConnectTrue();
  }
 }
 function openProfile(profile) {
  getIdProfile(profile);
 }

 function voicejoin(channel) {
  //startVoiceStream(channel);
  joinvoice(channel);
 }

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

 if (receivingCall) {
  if (!acc) {
   acc = true;
   setTimeout(() => {
    setReceivingCall(false);
    console.log("accepting call");
    acceptCall();
   }, 1000);
  }
 }

 if (serverSidebar && isAuthenticated) {
  return (
   <div className='channellist'>
    <div className='serverchannels'>
     <h3 className='center' style={{ background: "black" }}>
      {server.name}
     </h3>
     <ul>
      <li style={{ display: "none" }}>
       {UserVideo}
       {PartnerVideo}
      </li>
      <li>
       <Link to='/serverlanding'>Landing Page</Link>
      </li>
      {serverChannelList.map((channel, i) => (
       <li key={i}>
        <Link to='/redirectchat' onClick={() => openChannel(channel)}>
         {channel.name}
        </Link>
       </li>
      ))}
      <li>
       <Link to='#' onClick={() => voicejoin("channeltest")}>
        Channel Test
       </Link>
      </li>
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
 } else if (isAuthenticated) {
  return (
   <div>
    <div className='friendlist'>
     <h3 className='center' style={{ background: "black" }}>
      Friends:
     </h3>
     <div className='friends'>
      <ul>
       {friendList.map((friend, i) => (
        <li
         key={i}
         className='banner'
         style={{
          backgroundImage: `url(${friend.profileBanner})`,
         }}
        >
         <div
          className='profilepicture'
          style={{
           backgroundImage: `url('${friend.profilePicture}')`,
          }}
         ></div>
         <Link to='#'>
          <p style={{ background: "rgb(0,0,0,.5)" }}>{friend.name}</p>
         </Link>
         <div className='friendlistsubmenu'>
          <ul>
           <li>
            <Link to='/redirectchat' onClick={() => openDM(friend)}>
             Message
            </Link>
           </li>
           <li>
            <Link to='/profilepage' onClick={() => openProfile(friend)}>
             Profile
            </Link>
           </li>
          </ul>
         </div>
        </li>
       ))}
      </ul>
     </div>
    </div>
    <div className='serverchannels'></div>
   </div>
  );
 } else {
  return <div className='friendlist'></div>;
 }
};

export default LeftSidebar;

/*

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
