import React, { useContext, useEffect } from 'react';

import AuthContext from '../../context/auth/authContext';
import ServerContext from '../../context/server/serverContext';

const FindServers = () => {
 const authContext = useContext(AuthContext);

 const serverContext = useContext(ServerContext);

 const { servers, getServers, updateServerUserList } = serverContext;

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
      {servers.map((server, i) => (
       <li key={i} onClick={() => joinServer(server)}>
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
