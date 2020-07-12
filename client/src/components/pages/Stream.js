import React, { useState, useRef, useEffect, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import io from 'socket.io-client';
import AuthContext from '../../context/auth/authContext';

const ENDPOINT = ':5002';

const config = {
 iceServers: [
  {
   urls: ['stun:stun.l.google.com:19302'],
  },
 ],
};

const Stream = () => {
 const authContext = useContext(AuthContext);

 const streamingVideo = useRef();
 const socket = useRef();

 const [stream, setStream] = useState();
 const [peerConnection, setPeerConnection] = useState();

 useEffect(() => {
  let incomingStream = new MediaStream();

  socket.current = io.connect(ENDPOINT);
  const RTCConnection = new RTCPeerConnection(config);

  socket.current.on('offer', (id, description) => {
   //Send a connection answer to the request of the broadcaster
   RTCConnection.setRemoteDescription(description)
    .then(() => RTCConnection.createAnswer())
    .then((sdp) => {
     RTCConnection.setLocalDescription(sdp);
    })
    .then(() => {
     socket.current.emit('answer', id, RTCConnection.localDescription);
    });

   if (streamingVideo.current) {
    streamingVideo.current.srcObject = incomingStream;
   }
   //After the connection is established we get the video stream
   RTCConnection.ontrack = (event) => {
    incomingStream.addTrack(event.streams[0].getTracks()[0]);
   };

   setStream(incomingStream);

   RTCConnection.onicecandidate = (event) => {
    if (event.candidate) {
     socket.current.emit('candidate', id, event.candidate);
    }
   };
  });

  socket.current.on('candidate', (id, candidate) => {
   RTCConnection.addIceCandidate(new RTCIceCandidate(candidate)).catch((err) =>
    console.error(err)
   );
  });

  socket.current.on('connect', () => {
   socket.current.emit('viewer');
  });

  socket.current.on('broadcaster', () => {
   socket.current.emit('viewer');
  });

  socket.current.on('disconnectPeer', () => {
   peerConnection.close();
  });

  window.onunload = window.onbeforeunload = () => {
   socket.current.close();
  };

  setPeerConnection(RTCConnection);
 }, []);

 let StreamingVideo = (
  <video playsInline className='streamvideoEle' ref={streamingVideo} autoPlay />
 );
 if (!authContext.user) {
  return <Redirect to='/' />;
 } else {
  return (
   <div className='stream'>
    <div className='streamgrid'>
     <div className='streamvideo'>{StreamingVideo}</div>
     <div
      className='footerbackground'
      style={{
       backgroundImage: `url('https://i0.wp.com/5ergiveaways.com/wp-content/uploads/2018/09/BG.png?fit=2560%2C1440&ssl=1')`,
      }}
     >
      <div className='streamfooter'>
       <div className='leftstreamfooter'>
        <div
         className='profilepicture'
         style={{
          backgroundImage: `url('https://ubistatic19-a.akamaihd.net/ubicomstatic/en-GB/global/media/Header_1600x1000_264197.jpg')`,
         }}
        ></div>
        <h2>YourName</h2>
       </div>
       <div></div>
       <div className='rightstreamfooter'>
        <button className='globalbutton'>Follow</button>{' '}
        <button className='globalbutton'>Subscribe!</button>
       </div>
      </div>
     </div>
    </div>
    <div
     className='streambelowbackground'
     style={{
      backgroundImage: `url('https://cdn.statically.io/img/www.wallpapers13.com/wp-content/uploads/2015/12/Fantastic-universe-mz-space-stars-galaxies-Ultra-HD-Desktop-1920x1080.jpg')`,
     }}
    >
     <div className='streambelow'>
      <div>
       <button className='globalbutton'>Profile</button>
       <button className='globalbutton'>Followers</button>
       <button className='globalbutton'>Following</button>
      </div>
      <div>
       <ul>
        <li></li>
       </ul>
      </div>
     </div>
    </div>
   </div>
  );
 }
};

export default Stream;
