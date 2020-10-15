import React, { useContext, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import ServerContext from '../../context/server/serverContext';
import AuthContext from '../../context/auth/authContext';

const ServerLanding = () => {
 const authContext = useContext(AuthContext);

 const serverContext = useContext(ServerContext);

 const { server, displayServerSidebars } = serverContext;

 useEffect(() => {
  authContext.loadUser();
  displayServerSidebars();
  // eslint-disable-next-line
 }, []);
 if (!authContext.user) {
  console.log('nothing to return');
  return <Redirect to='/' />;
 } else {
  return (
   <div
    className='server-Landingpageimg'
    style={{
     backgroundImage: `url(${server.img})`,
    }}
   >
    <div>
     <h1
      className='globalHeader'
      style={{ backgroundColor: 'rgb(0, 4, 17, 0.7)', color: 'red' }}
     >
      {server.name}
     </h1>
    </div>
    <div>
     <div>
      <div>
       <h2
        className='globalHeader'
        style={{ backgroundColor: 'rgb(0, 4, 17, 0.7)', color: 'red' }}
       >
        Welcome To the Server!!
       </h2>{' '}
       <br />{' '}
       <h2
        className='globalHeader'
        style={{ backgroundColor: 'rgb(0, 4, 17, 0.7)', color: 'red' }}
       >
        Please take a look at our rules!
       </h2>
      </div>
     </div>
    </div>
    <div className='globalHeader'></div>
   </div>
  );
 }
};

export default ServerLanding;
