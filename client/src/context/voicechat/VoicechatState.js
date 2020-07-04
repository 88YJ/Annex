import React, { useReducer } from "react";
import VoicechatContext from "./voicechatContext";
import voicechatReducer from "./voicechatReducer";
import io from "socket.io-client";
import { SET_CURRENT_VOICE_CHANNEL } from "../types";
//import {} from "../types";
//import Axios from "axios";

let socket;

const VoicechatState = (props) => {
 const initialState = {
  peerConnections: [],
  localStream: {},
  remoteStream: {},
  voiceChannel: "",
 };

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

 if (socket) {
  socket.disconnect();
 }
 socket = io(ENDPOINT);

 var streamConstraints;

 // Set Current Voice Channel
 const setCurrentVoiceChannel = async (channel) => {
  try {
   dispatch({ type: SET_CURRENT_VOICE_CHANNEL, payload: channel });

   streamConstraints = {
    video: false,
    audio: true,
   };

   socket.emit("voiceChannel", channel);
  } catch (err) {
   console.log("Couldn't find voice channel");
  }
 };

 socket.on("joined", function (channel) {
  console.log("HERE");
  navigator.mediaDevices
   .getUserMedia(streamConstraints)
   .then((stream) => {
    socket.emit("ready", channel);
    console.log(stream);
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
    peerConnections: state.peerConnections,
    localStream: state.localStream,
    voiceChannel: state.voiceChannel,
    setCurrentVoiceChannel,
   }}
  >
   {props.children}
  </VoicechatContext.Provider>
 );
};

export default VoicechatState;
