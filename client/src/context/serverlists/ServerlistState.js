import React, { useReducer } from "react";
import uuid from "uuid";
import ServerlistContext from "./serverlistContext";
import serverlistReducer from "./serverlistReducer";
import { GET_SERVERS } from "../types";
import Axios from "axios";

const ServerlistState = (props) => {
 const initialState = {
  servers: null,
 };

 const [state, dispatch] = useReducer(serverlistReducer, initialState);

 //Get Servers
 const getServers = async () => {
  try {
   const res = await Axios.get("/api/servers");
   console.log(res.data);

   dispatch({ type: GET_SERVERS, payload: res.data });
  } catch (err) {
   console.log("no servers to display");
  }
 };

 //Create Server
 const createServer = async (server) => {
  const config = {
   headers: {
    "Content-Type": "application/json",
   },
  };
  try {
   const resServer = await Axios.post("/api/servers", server, config);

   const resUser = await Axios.put(
    `api/users/${resServer.data._id}`,
    server,
    config
   );

   getServers();
  } catch (err) {
   console.log("Failed to create server");
  }
 };

 return (
  <ServerlistContext.Provider
   value={{
    servers: state.servers,
    getServers,
    createServer,
   }}
  >
   {props.children}
  </ServerlistContext.Provider>
 );
};

export default ServerlistState;
