import React, { useContext, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import ServerContext from '../../context/server/serverContext';
import io from 'socket.io-client';
import AuthContext from '../../context/auth/authContext';

let red = false;

const ServerLanding = () => {
 const authContext = useContext(AuthContext);

 const serverContext = useContext(ServerContext);

 const { server, displayServerSidebars } = serverContext;

 const { user } = authContext;

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
    className='landingpageimg'
    style={{
     backgroundImage: `url(${server.img})`,
    }}
   >
    <div>
     <h1 className='center landingpageheader'>{server.name}</h1>
    </div>
    <div className='center'>
     <div className='center'>
      <div className='landingpageinnerheader'>
       <h2>Welcome To the Server!!</h2> <br />{' '}
       <h2>Please take a look at our rules!</h2>
      </div>
     </div>
     <div className='landingpageinnerbody'>
      Rule1: Don't talk about fightclub <br />
      Rule2: Don't talk about fightclub <br />
      Rule3:Don't break any of the previous rules
     </div>
    </div>
    <div></div>
   </div>
  );
 }
};

export default ServerLanding;
