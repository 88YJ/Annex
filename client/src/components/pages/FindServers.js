import React, { useContext, useEffect } from "react";

import AuthContext from "../../context/auth/authContext";
import FindserversContext from "../../context/findservers/findserversContext";
import ServerlistContext from "../../context/serverlists/serverlistContext";

const FindServers = () => {
 const authContext = useContext(AuthContext);

 const findserversContext = useContext(FindserversContext);

 const serverlistContext = useContext(ServerlistContext);

 const { updateServerUserList, getUserServers } = serverlistContext;

 const { servers, getServers } = findserversContext;

 useEffect(() => {
  authContext.loadUser();
  getServers();
  // eslint-disable-next-line
 }, []);

 function joinServer(server) {
  updateServerUserList(server);
 }

 return (
  <div className='serverfind'>
   <div className='serverfind'>
    <h3>Servers:</h3>
    <div className='serverfind'>
     <ul>
      {servers.map((server) => (
       <li key={server._id} onClick={() => joinServer(server)}>
        <div
         className='serverimgsmall'
         style={{
          backgroundImage: `url(${server.img})`,
         }}
        ></div>
        <h3>{server.name}</h3>
       </li>
      ))}
     </ul>
    </div>
   </div>
  </div>
 );
};

export default FindServers;
