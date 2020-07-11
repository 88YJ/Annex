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
  <div>
   <div className='serverfind'>
    <h1>Servers:</h1>
    <div className='serverfind'>
     <ul>
      {servers.map((server, i) => (
       <li key={i}>
        <div
         className='serverimgsmall'
         style={{
          backgroundImage: `url(${server.img})`,
         }}
        ></div>
        <button className='globalbutton' onClick={() => joinServer(server)}>
         Join Server
        </button>
        <h2 style={{ backgroundColor: 'rgb(0,0,0, .5)' }}>{server.name}</h2>
       </li>
      ))}
     </ul>
    </div>
   </div>
  </div>
 );
};

export default FindServers;
