import React, { useReducer, useContext } from 'react';
import ServerContext from './serverContext';
import serverReducer from './serverReducer';
import {
 SET_CURRENT_SERVER,
 DISPLAY_SERVER_SIDEBARS,
 HIDE_SERVER_SIDEBARS,
 GET_SERVER_USERLIST,
} from '../types';
import Axios from 'axios';

import Logo from '../../components/layout/Logo.jpg';

const ServerState = (props) => {
 const initialState = {
  server: {},
  serverLogo: Logo,
  serverSidebar: false,
  serverUserList: [],
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
  } catch (err) {
   console.log("Couldn't find server");
  }
 };

 // Get server userlist
 const getUserList = async (UserIds) => {
  const config = {
   headers: {
    'Content-Type': 'application/json',
   },
  };
  try {
   const res = await Axios.get(`/api/users/${UserIds}`, config);
   dispatch({ type: GET_SERVER_USERLIST, payload: res.data });
  } catch (err) {
   console.log('No users in the server');
  }
 };

 return (
  <ServerContext.Provider
   value={{
    server: state.server,
    serverLogo: state.serverLogo,
    serverSidebar: state.serverSidebar,
    serverUserList: state.serverUserList,
    setCurrentServer,
    displayServerSidebars,
    hideServerSidebars,
    getUserList,
   }}
  >
   {props.children}
  </ServerContext.Provider>
 );
};

export default ServerState;
