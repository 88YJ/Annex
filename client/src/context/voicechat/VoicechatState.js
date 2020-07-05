import React, { useReducer, useContext, useEffect, useRef } from "react";
import VoicechatContext from "./voicechatContext";
import voicechatReducer from "./voicechatReducer";
import io from "socket.io-client";
import Peer from "simple-peer";
import {
 SET_CURRENT_VOICE_CHANNEL,
 SET_VOICE_STREAM,
 UPDATE_VOICE_CHAT_USERLIST,
 UPDATE_PEER_CONNECTIONS,
 UPDATE_LOCAL_ID,
 SET_RECEIVING_CALL,
 SET_CALLER,
 SET_CALLER_SIGNAL,
 SET_CALL_ACCEPTED,
} from "../types";
//import {} from "../types";
//import Axios from "axios";

import AuthContext from "../../context/auth/authContext";

//let socket;

const ENDPOINT = ":5002";

const VoicechatState = (props) => {
 const initialState = {
  userVideo: {},
  partnerVideo: {},
  localID: "",
  userList: {},
  stream: {},
  receivingCall: false,
  caller: "",
  callerSignal: {},
  callAccepted: false,
 };

 const [state, dispatch] = useReducer(voicechatReducer, initialState);
 state.userVideo = useRef();
 state.partnerVideo = useRef();
 const socket = useRef();

 useEffect(() => {
  socket.current = io.connect(ENDPOINT);

  navigator.mediaDevices
   .getUserMedia({ video: false, audio: true })
   .then((stream) => {
    setStream(stream);
    if (state.userVideo.current) {
     state.userVideo.current.srcObject = stream;
    }
   });

  socket.current.on("yourID", (id) => {
   setLocalID(id);
  });

  socket.current.on("allUsers", (users) => {
   setUserList(users);
  });

  socket.current.on("hey", (data) => {
   setReceivingCall(true);
   setCaller(data.from);
   setCallerSignal(data.signal);
  });
 }, []);

 const setLocalID = (id) => {
  console.log("Local Id set " + id);
  try {
   dispatch({ type: UPDATE_LOCAL_ID, payload: id });
  } catch (err) {
   console.log("Couldn't update local ID");
  }
 };

 const setUserList = (users) => {
  console.log("User List set" + users);
  try {
   dispatch({ type: UPDATE_VOICE_CHAT_USERLIST, payload: users });
  } catch (err) {
   console.log("Couldn't update userlist");
  }
 };

 const setStream = (stream) => {
  console.log("Stream set " + stream);
  try {
   dispatch({ type: SET_VOICE_STREAM, payload: stream });
  } catch (err) {
   console.log("Couldn't update stream");
  }
 };

 const setReceivingCall = (isReceiving) => {
  console.log("Receiving call " + isReceiving);
  try {
   dispatch({ type: SET_RECEIVING_CALL, payload: isReceiving });
  } catch (err) {
   console.log("Couldn't recieve call");
  }
 };

 const setCaller = (caller) => {
  console.log("Caller " + caller);
  try {
   dispatch({ type: SET_CALLER, payload: caller });
  } catch (err) {
   console.log("Couldn't set caller");
  }
 };

 const setCallerSignal = (signal) => {
  console.log("Caller signal " + signal);
  try {
   dispatch({ type: SET_CALLER_SIGNAL, payload: signal });
  } catch (err) {
   console.log("Couldn't recieve caller signal");
  }
 };

 const setCallAccepted = (accepted) => {
  console.log("Call accepted " + accepted);
  try {
   dispatch({ type: SET_CALL_ACCEPTED, payload: accepted });
  } catch (err) {
   console.log("Couldn't accept call");
  }
 };

 function callPeer(id) {
  const peer = new Peer({
   initiator: true,
   trickle: false,
   config: {
    iceServers: [
     {
      url: "stun:stun.services.mozilla.com",
     },
     {
      url: "stun:stun.l.google.com:19302",
     },
    ],
   },
   stream: state.stream,
  });

  peer.on("signal", (data) => {
   socket.current.emit("callUser", {
    userToCall: id,
    signalData: data,
    from: state.localID,
   });
  });

  peer.on("stream", (stream) => {
   if (state.partnerVideo.current) {
    state.partnerVideo.current.srcObject = stream;
   }
   console.log("HELLO");
  });

  socket.current.on("callAccepted", (signal) => {
   setCallAccepted(true);
   peer.signal(signal);
  });
 }

 function acceptCall() {
  setCallAccepted(true);
  const peer = new Peer({
   initiator: false,
   trickle: false,
   stream: state.stream,
  });
  peer.on("signal", (data) => {
   socket.current.emit("acceptCall", { signal: data, to: state.caller });
  });

  peer.on("stream", (stream) => {
   state.partnerVideo.current.srcObject = stream;
   console.log("HELLO FROM ME");
  });

  peer.signal(state.callerSignal);
 }

 /*
 const initialState = {
  peerConnections: {},
  userList: [],
  localStream: {},
  remoteStream: new MediaStream(),
  voiceChannel: "",
  voiceStream: {},
 };

 const authContext = useContext(AuthContext);
 const { user } = authContext;

 const iceServers = {
  iceServers: [
   {
    url: "stun:stun.services.mozilla.com",
   },
   {
    url: "stun:stun.l.google.com:19302",
   },
  ],
 };

 const [state, dispatch] = useReducer(voicechatReducer, initialState);
 const ENDPOINT = ":5002";

 socket = io(ENDPOINT);

 var streamConstraints = {
  video: false,
  audio: true,
 };

 const setupRTCPeerConnection = (id, voiceStream) => {
  const peerConnection = new RTCPeerConnection(iceServers);
  state.peerConnections[id] = peerConnection;

  try {
   dispatch({ type: UPDATE_PEER_CONNECTIONS, payload: state.peerConnections });
  } catch (err) {
   console.log("Couldn't update peer connections");
  }

  console.log(state.peerConnections);

  voiceStream
   .getTracks()
   .forEach((track) => peerConnection.addTrack(track, voiceStream));

  peerConnection.onicecandidate = (event) => {
   if (event.candidate) {
    socket.emit("candidate", event.candidate);
   }
  };

  peerConnection
   .createOffer()
   .then((sdp) => {
    peerConnection.setLocalDescription(sdp);
   })
   .then(() => {
    socket.emit("offer", peerConnection.localDescription);
   });

  console.log(`SOCKET EMMITING CANDIDATE AND ANSWER ${id}`);
 };

 const setVoiceStream = async (id) => {
  await navigator.mediaDevices
   .getUserMedia(streamConstraints)
   .then((stream) => {
    setupRTCPeerConnection(id, stream);
    try {
     dispatch({ type: SET_VOICE_STREAM, payload: stream });
    } catch (err) {
     console.log("Couldn't find voice channel");
    }
   });
 };

 const updateUserList = (users) => {
  try {
   dispatch({ type: UPDATE_VOICE_CHAT_USERLIST, payload: users });
  } catch (err) {
   console.log("Couldn't update voice channel user list");
  }
 };

 // Set Current Voice Channel
 const setCurrentVoiceChannel = async (channel) => {
  let info = {
   name: user.name,
   room: channel._id,
   profileimg: user.profilePicture,
  };
  try {
   dispatch({ type: SET_CURRENT_VOICE_CHANNEL, payload: channel });
   socket.emit("voice_chat_join", info, (error) => {
    if (error) {
     alert(error);
    }
   });
  } catch (err) {
   console.log("Couldn't find voice channel");
  }
 };

 socket.on("roomData", ({ users }, id) => {
  updateUserList(users);
  setVoiceStream(id);
 });

 socket.on("answer", (id, description) => {
  state.peerConnections[id].setRemoteDescription(description);
 });

 socket.on("candidate", (id, candidate) => {
  //console.log(`HERE IS THE ID: ${id}`);
  console.log(state.peerConnections[id]);
  state.peerConnections[id].addIceCandidate(new RTCIceCandidate(candidate));
 });

 socket.on("offer", (id, description) => {
  const peerConnection = new RTCPeerConnection(iceServers);
  //Send a connection answer to the request of the broadcaster
  peerConnection
   .setRemoteDescription(description)
   .then(() => peerConnection.createAnswer())
   .then((sdp) => {
    peerConnection.setLocalDescription(sdp);
   }) //sdp = session Description
   .then(() => {
    socket.emit("answer", peerConnection.localDescription);
   });

  let incomingStream = new MediaStream();
  //video.srcObject = remoteStream;
  //After the connection is established we get the video stream
  peerConnection.ontrack = (event) => {
   incomingStream.addTrack(event.streams[0].getTracks()[0]);
  };
 });

 /*
 socket.on("joined", function (channel) {
  console.log("HERE");
  navigator.mediaDevices
   .getUserMedia(streamConstraints)
   .then((stream) => {
    dispatch({ type: SET_VOICE_STREAM, payload: stream });
    socket.emit("ready", channel);
   })
   .catch(function (err) {
    console.error("An error ocurred when accessing media devices:" + err);
   });
 });
 /*
 socket.on("offer", (id, description) => {
  createPeerConnection();
  rtcPeerConnection.setRemoteDescription(new RTCSessionDescription(event));
  rtcPeerConnection
   .createAnswer()
   .then((desc) => setLocalAndAnswer(desc))
   .catch((e) => console.log(e));
 });

 socket.on("answer", (id, description) => {
  peerConnections[id].setRemoteDescription(description);
 });

 socket.on("candidate", (id, candidate) => {
  peerConnections[id].addIceCandidate(new RTCIceCandidate(candidate));
 });
 */

 return (
  <VoicechatContext.Provider
   value={{
    // peerConnections: state.peerConnections,
    // localStream: state.localStream,
    // voiceChannel: state.voiceChannel,
    // voiceStream: state.voiceStream,
    // userList: state.userList,
    // setCurrentVoiceChannel,
    userVideo: state.userVideo,
    partnerVideo: state.partnerVideo,
    localID: state.localID,
    userList: state.userList,
    stream: state.stream,
    receivingCall: state.receivingCall,
    caller: state.caller,
    callerSignal: state.callerSignal,
    callAccepted: state.callAccepted,
    callPeer,
    acceptCall,
   }}
  >
   {props.children}
  </VoicechatContext.Provider>
 );
};

export default VoicechatState;
