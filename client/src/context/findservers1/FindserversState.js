import React, { useReducer } from "react";
import FindserversContext from "./findserversContext";
import findserversReducer from "./findserversReducer";
import { GET_SERVERS } from "../types";
import Axios from "axios";

const FindserversState = (props) => {
 const initialState = {
  servers: [],
 };

 const [state, dispatch] = useReducer(findserversReducer, initialState);

 //Get Servers
 const getServers = async () => {
  try {
   const res = await Axios.get("/api/servers/");

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
  <FindserversContext.Provider
   value={{
    servers: state.servers,
    getServers,
    createServer,
   }}
  >
   {props.children}
  </FindserversContext.Provider>
 );
};

export default FindserversState;
