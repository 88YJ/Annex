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

import { Link } from "react-router-dom";

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

 const { showModalWithAddServer } = modalContext;

 const [stream, setStream] = useState();
 const userVideo = useRef();

 useEffect(() => {
  authContext.loadUser();
  getUserServers();
  // eslint-disable-next-line
 }, []);

 const displayModal = () => {
  showModalWithAddServer();
 };

 const startStream = async () => {
  try {
   await navigator.mediaDevices.getDisplayMedia().then((stream) => {
    setStream(stream);
    if (userVideo.current) {
     userVideo.current.srcObject = stream;
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
