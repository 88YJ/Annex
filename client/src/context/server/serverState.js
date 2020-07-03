import React, { useReducer, useContext } from "react";
import ServerContext from "./serverContext";
import serverReducer from "./serverReducer";
import {
 SET_CURRENT_SERVER,
 DISPLAY_SERVER_SIDEBARS,
 HIDE_SERVER_SIDEBARS,
 GET_SERVER_USERLIST,
 GET_SERVER_CHANNELLIST,
} from "../types";
import Axios from "axios";

import Logo from "../../components/layout/Logo.jpg";

const ServerState = (props) => {
 const initialState = {
  server: {},
  serverLogo: Logo,
  serverSidebar: false,
  serverUserList: [],
  serverChannelList: [],
 };

 const config = {
  headers: {
   "Content-Type": "application/json",
  },
 };
 const [state, dispatch] = useReducer(serverReducer, initialState);

 const displayServerSidebars = async () => {
  try {
   dispatch({ type: DISPLAY_SERVER_SIDEBARS });
  } catch (err) {
   console.log("Couldn't load server sidebars");
  }
 };

 const hideServerSidebars = async () => {
  try {
   dispatch({ type: HIDE_SERVER_SIDEBARS });
  } catch (err) {
   console.log("Couldn't hide server sidebars");
  }
 };

 // Set Current Server
 const setCurrentServer = async (server) => {
  try {
   dispatch({ type: SET_CURRENT_SERVER, payload: server });
   getUserList(server.userList);
   getServerChannels(server.channelList);
  } catch (err) {
   console.log("Couldn't find server");
  }
 };

 // Get server userlist
 const getUserList = async (userIds) => {
  try {
   const res = await Axios.get(`/api/users/${userIds}`, config);
   dispatch({ type: GET_SERVER_USERLIST, payload: res.data });
  } catch (err) {
   console.log("No users in the server");
  }
 };

 //Create a channel
 const createChannel = async (channel) => {
  try {
   const res = await Axios.post(`/api/servers/channels`, channel, config);
  } catch (err) {
   console.log("Failed to create channel");
  }
 };

 // Get server userlist
 const getServerChannels = async (channelIds) => {
  try {
   const res = await Axios.get(
    `/api/servers/channels/all/${channelIds}`,
    config
   );
   dispatch({ type: GET_SERVER_CHANNELLIST, payload: res.data });
  } catch (err) {
   console.log("Failed to get channels");
  }
 };

 return (
  <ServerContext.Provider
   value={{
    server: state.server,
    serverLogo: state.serverLogo,
    serverSidebar: state.serverSidebar,
    serverUserList: state.serverUserList,
    serverChannelList: state.serverChannelList,
    setCurrentServer,
    displayServerSidebars,
    hideServerSidebars,
    getUserList,
    createChannel,
    getServerChannels,
   }}
  >
   {props.children}
  </ServerContext.Provider>
 );
};

export default ServerState;
