import React, { useReducer, useContext, useEffect, useRef } from "react";
import VoicechatContext from "./voicechatContext";
import voicechatReducer from "./voicechatReducer";
import io from "socket.io-client";
import Peer from "simple-peer";
import {
 SET_VOICE_STREAM,
 UPDATE_VOICE_CHAT_USERLIST,
 UPDATE_LOCAL_ID,
 SET_RECEIVING_CALL,
 SET_CALLER,
 SET_CALLER_SIGNAL,
 SET_CALL_ACCEPTED,
 SET_CURRENT_VOICE_CHANNEL,
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
  userList: [
   {
    name: "yay",
    id: "empty",
    profileimg:
     "https://hdwallpaperim.com/wp-content/uploads/2017/08/22/101488-anime_girls-music-headphones-anime-748x421.jpg",
   },
  ],
  stream: {},
  receivingCall: false,
  caller: {},
  callerSignal: {},
  callAccepted: false,
  channelID: "",
 };

 const [state, dispatch] = useReducer(voicechatReducer, initialState);
 state.userVideo = useRef();
 state.partnerVideo = useRef();
 const socket = useRef();

 const authContext = useContext(AuthContext);
 const { user } = authContext;

 let name;
 let profileimg;
 let room;
 let myid;
 let streamport;
 let callerD;
 let me = 0;

 if (user) {
  name = user.name;
  profileimg = user.profilePicture;
  room = "somethingrandom";
 } else {
  name = "place holder";
  profileimg = "placeholder";
  room = "somethingrandom";
 }

 useEffect(() => {
  socket.current = io.connect(ENDPOINT);

  socket.current.on("yourID", (id) => {
   setLocalID(id);
   myid = id;
  });

  navigator.mediaDevices
   .getUserMedia({ video: false, audio: true })
   .then((stream) => {
    setStream(stream);
    streamport = stream;
    if (state.userVideo.current) {
     state.userVideo.current.srcObject = stream;
    }
   });

  socket.current.on(
   "allUsers",
   ({ users, newUser }) => {
    setUserList(users);
    if (me == 0) {
     me = users.length;
    }

    console.log("my num" + me);
    if (myid == newUser) {
     console.log("match");
    } else {
     setTimeout(() => {
      callPeer(newUser);
     }, 3000 * me);
    }
   },
   []
  );

  socket.current.on("hey", (data) => {
   setCaller(data.from);
   setCallerSignal(data.signal);
   callerD = data.signal;
   setReceivingCall(true);
  });
 }, []);

 function startVoiceStream() {}

 function joinvoice(channel) {
  console.log(streamport);
  room = channel;
  console.log(channel);
  socket.current.emit("joinvoice", { name, room, profileimg });

  try {
   dispatch({ type: SET_CURRENT_VOICE_CHANNEL, payload: channel._id });
  } catch (err) {
   console.log("Couldn't set current channel");
  }
 }

 const setLocalID = (id) => {
  try {
   dispatch({ type: UPDATE_LOCAL_ID, payload: id });
  } catch (err) {
   console.log("Couldn't update local ID");
  }
 };

 const setUserList = (users) => {
  try {
   dispatch({ type: UPDATE_VOICE_CHAT_USERLIST, payload: users[0] });
  } catch (err) {
   console.log("Couldn't update userlist");
  }
 };

 const setStream = (stream) => {
  try {
   dispatch({ type: SET_VOICE_STREAM, payload: stream });
  } catch (err) {
   console.log("Couldn't update stream");
  }
 };

 const setReceivingCall = (isReceiving) => {
  try {
   dispatch({ type: SET_RECEIVING_CALL, payload: isReceiving });
  } catch (err) {
   console.log("Couldn't recieve call");
  }
 };

 const setCaller = (caller) => {
  try {
   dispatch({ type: SET_CALLER, payload: caller });
  } catch (err) {
   console.log("Couldn't set caller");
  }
 };

 const setCallerSignal = (signal) => {
  callerD = signal;
  try {
   dispatch({ type: SET_CALLER_SIGNAL, payload: signal });
  } catch (err) {
   console.log("Couldn't recieve caller signal");
  }
 };

 const setCallAccepted = (accepted) => {
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
   stream: streamport,
  });
  let ok = true;
  peer.on("signal", (data) => {
   console.log(
    "signal!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"
   );
   if (ok) {
    ok = false;
    socket.current.emit("callUser", {
     userToCall: id,
     signalData: data,
     //from: user.name,
    });
   }
  });
  peer.on("stream", (stream) => {
   console.log(stream);
   if (state.partnerVideo.current) {
    state.partnerVideo.current.srcObject = stream;
   }
  });

  socket.current.on("callAccepted", (signal) => {
   setCallAccepted(true);
   peer.signal(signal);
  });
 }

 const acceptCall = () => {
  console.log("accepted");
  setCallAccepted(true);
  const peer = new Peer({
   initiator: false,
   trickle: false,
   stream: state.stream,
  });
  let ok1 = true;
  let ok2 = true;
  peer.on("signal", (data) => {
   console.log(
    "acceptsignal!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"
   );
   if (ok1 && ok2) {
    ok1 = false;
    socket.current.emit("acceptCall", { signal: data, to: state.caller.id });
    console.log("accept call 1" + data);
   } else if (ok2) {
    ok2 = false;
    socket.current.emit("acceptCall", { signal: data, to: state.caller.id });
    console.log("accept call 2" + data);
   }
  });

  peer.on("stream", (stream) => {
   console.log("THIS IS THE STREAM" + stream);
   state.partnerVideo.current.srcObject = stream;
  });

  peer.signal(state.callerSignal);
 };

 return (
  <VoicechatContext.Provider
   value={{
    userVideo: state.userVideo,
    partnerVideo: state.partnerVideo,
    localID: state.localID,
    userList: state.userList,
    stream: state.stream,
    receivingCall: state.receivingCall,
    caller: state.caller,
    callerSignal: state.callerSignal,
    callAccepted: state.callAccepted,
    channelID: state.channelID,
    startVoiceStream,
    acceptCall,
    joinvoice,
    setReceivingCall,
   }}
  >
   {props.children}
  </VoicechatContext.Provider>
 );
};

export default VoicechatState;
