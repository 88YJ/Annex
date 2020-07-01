import React, { useContext, useEffect } from 'react';

import AuthContext from '../../context/auth/authContext';
import DashContext from '../../context/dash/dashContext';
import GameContext from '../../context/games/gameContext';
import ServerContext from '../../context/server/serverContext';

const Dash = () => {
 const authContext = useContext(AuthContext);

 const dashContext = useContext(DashContext);

 const gameContext = useContext(GameContext);

 const serverContext = useContext(ServerContext);

 const { hideServerSidebars } = serverContext;

 const { trendstream, trendgames } = dashContext;

 const { games, displayGamesSidebar, getGames } = gameContext;

 useEffect(() => {
  authContext.loadUser();
  displayGamesSidebar();
  hideServerSidebars();
  getGames();
  // eslint-disable-next-line
 }, []);

 if (games !== null) {
  return (
   <div className='dashboard'>
    <h1 className='center' style={{ color: 'white' }}>
     Dashboard!
    </h1>
    <div className='dashGrid'>
     <div className='trendstream'>
      <h2 className='sticky'>Trending Streams For You!</h2>
      <ul>
       {trendstream.map((trendstream, i) => (
        <li key={i}>
         <div
          className='dashimg'
          style={{
           backgroundImage: `url(${trendstream.img})`,
          }}
         ></div>
         <h3 className='center'>{trendstream.name}</h3>
        </li>
       ))}
      </ul>
     </div>
     <div className='trendgames'>
      <h2 className='sticky'>Trending Games For You!</h2>
      <ul>
       {trendgames.map((trendgames, i) => (
        <li key={i}>
         <div
          className='dashimg'
          style={{
           backgroundImage: `url(${trendgames.img})`,
          }}
         ></div>
         <h3 className='center'>{trendgames.name}</h3>
        </li>
       ))}
      </ul>
     </div>
    </div>
    <div className='dashmygames'>
     <h2 className='sticky'>My Games</h2>
     <ul>
      {games.map((game) => (
       <li key={game._id}>
        <div
         className='dashmygamesimg'
         style={{
          backgroundImage: `url(${game.img})`,
         }}
        ></div>
        <h3 className='center'>{game.name}</h3>
       </li>
      ))}
     </ul>
    </div>
   </div>
  );
 } else {
  return (
   <div className='dashboard'>
    <h1 className='center' style={{ color: 'white' }}>
     Dashboard!
    </h1>
    <div className='dashGrid'>
     <div className='trendstream'>
      <h2 className='sticky'>Trending Streams For You!</h2>
      <ul>
       {trendstream.map((trendstream, i) => (
        <li key={i}>
         <div
          className='dashimg'
          style={{
           backgroundImage: `url(${trendstream.img})`,
          }}
         ></div>
         <h3 className='center'>{trendstream.name}</h3>
        </li>
       ))}
      </ul>
     </div>
     <div className='trendgames'>
      <h2 className='sticky'>Trending Games For You!</h2>
      <ul>
       {trendgames.map((trendgames, i) => (
        <li key={i}>
         <div
          className='dashimg'
          style={{
           backgroundImage: `url(${trendgames.img})`,
          }}
         ></div>
         <h3 className='center'>{trendgames.name}</h3>
        </li>
       ))}
      </ul>
     </div>
    </div>
    <div className='dashmygames'>
     <ul>
      {trendgames.map((game, i) => (
       <li key={i}>
        <div
         className='dashmygamesimg'
         style={{
          backgroundImage: `url(${game.img})`,
         }}
        ></div>
        <h3 className='center'>{game.name}</h3>
       </li>
      ))}
     </ul>
    </div>
   </div>
  );
 }
};

export default Dash;
