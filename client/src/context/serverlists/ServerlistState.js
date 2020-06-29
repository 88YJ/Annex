import React, { useReducer } from "react";
import uuid from "uuid";
import ServerlistContext from "./serverlistContext";
import serverlistReducer from "./serverlistReducer";
import { GET_USER_SERVERS } from "../types";
import Axios from "axios";

const ServerlistState = (props) => {
 const initialState = {
  userServerList: null,
 };

 const [state, dispatch] = useReducer(serverlistReducer, initialState);

 const config = {
  headers: {
   "Content-Type": "application/json",
  },
 };

 //Get Servers
 const getUserServers = async () => {
  try {
   const res = await Axios.get("/api/servers/userservers");

   dispatch({ type: GET_USER_SERVERS, payload: res.data });
  } catch (err) {
   console.log("no servers to display");
  }
 };

 const updateUserServerList = async (server) => {
  try {
   const res = await Axios.put(`api/users/${server._id}`, server, config);
   getUserServers();
  } catch (err) {
   console.log("Failed to update server list");
  }
 };

 const updateServerUserList = async (server) => {
  try {
   const res = await Axios.put(`api/servers/${server._id}`, server, config);
   updateUserServerList(server);
  } catch (err) {
   console.log("Failed to update user list");
  }
 };

 //Create Server
 const createServer = async (server) => {
  try {
   const res = await Axios.post("/api/servers", server, config);
   updateUserServerList(res.data);
  } catch (err) {
   console.log("Failed to create server");
  }
 };

 return (
  <ServerlistContext.Provider
   value={{
    userServerList: state.userServerList,
    getUserServers,
    createServer,
    updateServerUserList,
   }}
  >
   {props.children}
  </ServerlistContext.Provider>
 );
};

export default ServerlistState;
