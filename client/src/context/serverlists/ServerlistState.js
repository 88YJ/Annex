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

   dispatch({ type: GET_SERVERS, payload: res.data });
  } catch (err) {
   console.log("no servers to display");
  }
 };

 return (
  <ServerlistContext.Provider
   value={{
    servers: state.servers,
    getServers,
   }}
  >
   {props.children}
  </ServerlistContext.Provider>
 );
};

export default ServerlistState;
