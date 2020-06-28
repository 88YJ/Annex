import React, { useContext, useEffect } from "react";

import AuthContext from "../../context/auth/authContext";
import ServerContext from "../../context/server/serverContext";

const ServerPage = () => {
 const authContext = useContext(AuthContext);

 const serverContext = useContext(ServerContext);

 const { server, displayServerSidebars, getUserList } = serverContext;

 useEffect(() => {
  authContext.loadUser();
  displayServerSidebars();
  // eslint-disable-next-line
 }, []);

 return (
  <div>
   <ul>
    {
     <li key={server._id}>
      <div
       className='dashimg'
       style={{
        backgroundImage: `url(${server.img})`,
       }}
      ></div>
      <h3 className='center'>{server.name}</h3>
     </li>
    }
   </ul>
  </div>
 );
};

export default ServerPage;
