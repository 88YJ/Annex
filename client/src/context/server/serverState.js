import React, { useReducer } from "react";
import ServerContext from "./serverContext";
import serverReducer from "./serverReducer";
import { SET_CURRENT_SERVER } from "../types";

import Logo from "../../components/layout/Logo.jpg";

const ServerState = (props) => {
 const initialState = {
  server: {},
  serverLogo: Logo,
 };
 const [state, dispatch] = useReducer(serverReducer, initialState);

 // Get Current Server
 const setCurrentServer = async (server) => {
  try {
   dispatch({ type: SET_CURRENT_SERVER, payload: server });
  } catch (err) {
   console.log("Couldn't find server");
  }
 };

 return (
  <ServerContext.Provider
   value={{
    server: state.server,
    serverLogo: state.serverLogo,
    setCurrentServer,
   }}
  >
   {props.children}
  </ServerContext.Provider>
 );
};

export default ServerState;
