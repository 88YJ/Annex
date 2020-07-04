import React, { useReducer, useContext } from 'react';
import ServerContext from './serverContext';
import serverReducer from './serverReducer';
import {
 SET_CURRENT_SERVER,
 SET_CURRENT_CHANNEL,
 DISPLAY_SERVER_SIDEBARS,
 HIDE_SERVER_SIDEBARS,
 GET_SERVER_USERLIST,
 GET_SERVER_CHANNELLIST,
} from '../types';
import Axios from 'axios';

import Logo from '../../components/layout/Logo.jpg';

const ServerState = (props) => {
 const initialState = {
  server: {},
  channel: {
   name: 'default',
   customization: [
    {
     icon: 'default',
    },
   ],
  },
  serverLogo: Logo,
  serverSidebar: false,
  serverUserList: [],
  serverChannelList: [],
 };

 const config = {
  headers: {
   'Content-Type': 'application/json',
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
   getUserList(server._id);
   getServerChannels(server._id);
  } catch (err) {
   console.log("Couldn't find server");
  }
 };

 // Set Current Channel
 const setCurrentChannel = async (channel) => {
  try {
   dispatch({ type: SET_CURRENT_CHANNEL, payload: channel });
  } catch (err) {
   console.log("Couldn't find server");
  }
 };

 // Get server userlist
 const getUserList = async (serverID) => {
  try {
   const res = await Axios.get(`/api/users/${serverID}`, config);
   dispatch({ type: GET_SERVER_USERLIST, payload: res.data });
  } catch (err) {
   console.log('No users in the server');
  }
 };

 // Get server channels
 const getServerChannels = async (serverID) => {
  try {
   const res = await Axios.get(`/api/servers/channels/all/${serverID}`, config);
   dispatch({ type: GET_SERVER_CHANNELLIST, payload: res.data });
  } catch (err) {
   console.log('Failed to get channels');
  }
 };

 const updateServerChannelList = async (channelId) => {
  try {
   const res = await Axios.put(
    `/api/servers/channels/${channelId}`,
    state.server,
    config
   );
   getServerChannels(res.data._id);
  } catch (err) {
   console.log('Failed to create channel');
  }
 };

 //Create a channel
 const createChannel = async (channel) => {
  try {
   const res = await Axios.post(`/api/servers/channels`, channel, config);
   console.log('Channel id: ' + res.data._id);
   updateServerChannelList(res.data._id);
  } catch (err) {
   console.log('Failed to create channel');
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
    channel: state.channel,
    setCurrentServer,
    setCurrentChannel,
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
