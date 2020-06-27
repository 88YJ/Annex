import React, { useContext, useEffect } from 'react';

import AuthContext from '../../context/auth/authContext';
import DashContext from '../../context/dash/dashContext';

const Dash = () => {
 const authContext = useContext(AuthContext);

 const dashContext = useContext(DashContext);

 const { stream, games } = dashContext;

 useEffect(() => {
  authContext.loadUser();
  // eslint-disable-next-line
 }, []);

 return (
  <div className='dashboard'>
   <h1 className='center' style={{ color: 'white' }}>
    Dashboard!
   </h1>
   <div className='dashGrid'>
    <div className='trendstream'>
     <h2 className='center'>Trending Streams For You!</h2>
     <ul>
      {stream.map((stream) => (
       <li key={stream._id}>
        <div
         className='dashimg'
         style={{
          backgroundImage: `url(${stream.img})`,
         }}
        ></div>
        <h3 className='center'>{stream.name}</h3>
       </li>
      ))}
     </ul>
    </div>
    <div className='trendgames'>
     <h2 className='center'>Trending Games For You!</h2>
     <ul>
      {games.map((games) => (
       <li key={games._id}>
        <div
         className='dashimg'
         style={{
          backgroundImage: `url(${games.img})`,
         }}
        ></div>
        <h3 className='center'>{games.name}</h3>
       </li>
      ))}
     </ul>
    </div>
   </div>
   <div className='dashmygames'>
    <ul>
     {games.map((games) => (
      <li key={games._id}>
       <div
        className='dashmygamesimg'
        style={{
         backgroundImage: `url(${games.img})`,
        }}
       ></div>
       <h3 className='center'>{games.name}</h3>
      </li>
     ))}
    </ul>
   </div>
  </div>
 );
};

export default Dash;
