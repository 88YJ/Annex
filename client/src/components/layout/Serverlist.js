import React, {
 useContext,
 useEffect,
 useState,
 useRef,
 Fragment,
} from "react";

import AuthContext from "../../context/auth/authContext";
import ServerContext from "../../context/server/serverContext";
import ModalContext from "../../context/modal/modalContext";
import ChatContext from "../../context/chat/chatContext";
import io from "socket.io-client";

import { Link } from "react-router-dom";

const config = {
 iceServers: [
  {
   urls: ["stun:stun.l.google.com:19302"],
  },
 ],
};

const ENDPOINT = ":5002";

const Serverlist = () => {
 //background = 'https://wallpaperplay.com/walls/full/e/0/3/21596.jpg';

 const chatContext = useContext(ChatContext);

 const { setConnectTrue, connect } = chatContext;

 const authContext = useContext(AuthContext);

 const modalContext = useContext(ModalContext);

 const serverContext = useContext(ServerContext);

 const {
  setCurrentServer,
  serverLogo,
  userServerList,
  getUserServers,
 } = serverContext;

 const { user } = authContext;

 const { showModalWithAddServer } = modalContext;

 const [stream, setStream] = useState();
 const [peerConnections, setPeerConnections] = useState({});
 const userVideo = useRef();
 const socket = useRef();

 useEffect(() => {
  authContext.loadUser();
  getUserServers();
  // eslint-disable-next-line
 }, []);

 socket.current = io.connect(ENDPOINT);

 socket.current.on("viewer", (socketId, id) => {
  if (peerConnections[id]) {
   console.log("VIEWER ALREADY HAS A CONNECTION");
   peerConnections[id].close();
   delete peerConnections[id];
  }

  const peerConnection = new RTCPeerConnection(config);

  //Add the stream to the connection
  stream.getTracks().forEach((track) => peerConnection.addTrack(track, stream));

  //Send the found ICE candidate to server
  peerConnection.onicecandidate = (event) => {
   if (event.candidate) {
    socket.current.emit("candidate", socketId, event.candidate);
   }
  };

  const broadcasterInfo = {
   name: user.name,
   profilePicture: user.profilePicture,
  };

  //Send a connection offer to the client using setLocalDescription() as config for the connection
  peerConnection
   .createOffer()
   .then((sdp) => {
    peerConnection.setLocalDescription(sdp);
   })
   .then(() => {
    socket.current.emit(
     "offer",
     socketId,
     peerConnection.localDescription,
     broadcasterInfo
    );
   });

  setPeerConnections((peerConnections[id] = peerConnection)); //Saving to the peerConnections object
  console.log(peerConnections);
 });

 socket.current.on("answer", (id, description) => {
  peerConnections.setRemoteDescription(description);
 });

 socket.current.on("candidate", (id, candidate) => {
  peerConnections.addIceCandidate(new RTCIceCandidate(candidate));
 });

 socket.current.on("disconnectPeer", (id) => {
  if (peerConnections[id]) {
   peerConnections[id].close();
   delete peerConnections[id];
  }
 });

 const displayModal = () => {
  showModalWithAddServer();
 };

 const startStream = async () => {
  try {
   await navigator.mediaDevices.getDisplayMedia().then((stream) => {
    setStream(stream);
    console.log(stream);
    if (userVideo.current) {
     userVideo.current.srcObject = stream;
     socket.current.emit("broadcaster");
    }
   });
  } catch (err) {
   console.error("Error: " + err);
  }
 };

 function openServer(server) {
  setCurrentServer(server);

  if (!connect) {
   setConnectTrue();
  }
 }

 let UserVideo;
 if (stream) {
  UserVideo = (
   <video className='streampreview' playsInline ref={userVideo} autoPlay />
  );
 }

 if (userServerList == null) {
  return (
   <Fragment>
    <div className='footer'>
     <div
      className='serverimg'
      style={{
       backgroundImage: `url(${serverLogo})`,
      }}
     ></div>
     <div className='bottomlists'></div>
     <div className='rightbottom'>Stream</div>
    </div>
   </Fragment>
  );
 } else {
  return (
   <Fragment>
    <div className='footer'>
     <div
      className='serverimg'
      style={{
       backgroundImage: `url(${serverLogo})`,
      }}
     ></div>
     <div className='bottomlists'>
      <div className='servers'>
       <ul>
        <li key='addServer' onClick={displayModal}>
         <div
          className='serverimgsmall'
          style={{
           backgroundImage: "url('https://img.icons8.com/cotton/2x/plus.png')",
          }}
         ></div>
        </li>
        {userServerList.map((server, i) => (
         <Link to={`/serverlanding`} key={i}>
          <li onClick={() => openServer(server)}>
           <div
            className='serverimgsmall'
            style={{
             backgroundImage: `url(${server.img})`,
            }}
           ></div>
          </li>
         </Link>
        ))}
       </ul>
      </div>
     </div>
     <div className='rightbottom'>
      {UserVideo ? (
       UserVideo
      ) : (
       <Fragment>
        <h3>Stream</h3>
        <button className='globalbutton' onClick={startStream}>
         Start Stream
        </button>
       </Fragment>
      )}
     </div>
    </div>
   </Fragment>
  );
 }
};

export default Serverlist;
