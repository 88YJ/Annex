import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import DashContext from '../../context/dash/dashContext';
import GameContext from '../../context/games/gameContext';
import ServerContext from '../../context/server/serverContext';
import StoreContext from '../../context/store/storeContext';

const Dash = () => {
 const authContext = useContext(AuthContext);

 const dashContext = useContext(DashContext);

 const gameContext = useContext(GameContext);

 const storeContext = useContext(StoreContext);

 const serverContext = useContext(ServerContext);

 const { hideServerSidebars } = serverContext;

 const { trendstream, trendgames } = dashContext;

 const { games, displayGamesSidebar, getGames, setMyGame } = gameContext;

 const { hideCartSidebar } = storeContext;

 const { isAuthenticated } = authContext;

 useEffect(() => {
  authContext.loadUser();
  displayGamesSidebar();
  hideServerSidebars();
  hideCartSidebar();
  getGames();
  // eslint-disable-next-line
 }, []);

 function openGame(game) {
  setMyGame(game);
 }

 if (games !== null && isAuthenticated) {
  return (
   <div className='dashboard'>
    <h1 className='globalHeader' style={{ color: 'white' }}>
     Dashboard!
    </h1>
    <div className='dashboard-Grid'>
     <div className='dashboard-Trending'>
      <h2 className='sticky globalHeader' style={{ color: 'red' }}>
       Trending Streams For You!
      </h2>
      <ul>
       {trendstream.map((trendstream, i) => (
        <li key={i}>
         <div
          className='dashboard-TrendImg'
          style={{
           backgroundImage: `url(${trendstream.img})`,
          }}
         ></div>
         <h3 className='globalHeader' style={{ color: 'red' }}>
          {trendstream.name}
         </h3>
        </li>
       ))}
      </ul>
     </div>
     <div className='dashboard-Trending'>
      <h2 className='sticky globalHeader' style={{ color: 'red' }}>
       Trending Games For You!
      </h2>
      <ul>
       {trendgames.map((trendgames, i) => (
        <li key={i}>
         <div
          className='dashboard-TrendImg'
          style={{
           backgroundImage: `url(${trendgames.img})`,
          }}
         ></div>
         <h3 className='globalHeader' style={{ color: 'red' }}>
          {trendgames.name}
         </h3>
        </li>
       ))}
      </ul>
     </div>
    </div>
    <div className='dashboard-Games'>
     <h2 className='sticky globalHeader' style={{ color: 'red' }}>
      My Games
     </h2>
     <ul>
      {games.map((game) => (
       <li key={game._id}>
        <Link to='/game' onClick={() => openGame(game)}>
         <div
          className='dashboard-GamesImg'
          style={{
           backgroundImage: `url(${game.img})`,
          }}
         >
          <div className='dashboard-Game-Submenu'>
           <h3>{game.name}</h3>
          </div>
         </div>
        </Link>
       </li>
      ))}
     </ul>
    </div>
   </div>
  );
 } else if (isAuthenticated) {
  return (
   <div className='dashboard'>
    <h1 className='globalHeader' style={{ color: 'red' }}>
     Dashboard!
    </h1>
    <div className='dashGrid'>
     <div className='dashboard-Trending'>
      <h2 className='sticky globalHeader' style={{ color: 'red' }}>
       Trending Streams For You!
      </h2>
      <ul>
       {trendstream.map((trendstream, i) => (
        <li key={i}>
         <div
          className='dashboard-TrendImg'
          style={{
           backgroundImage: `url(${trendstream.img})`,
          }}
         ></div>
         <h3 className='globalHeader' style={{ color: 'red' }}>
          {trendstream.name}
         </h3>
        </li>
       ))}
      </ul>
     </div>
     <div className='dashboard-Trending'>
      <h2 className='sticky globalHeader' style={{ color: 'red' }}>
       Trending Games For You!
      </h2>
      <ul>
       {trendgames.map((trendgames, i) => (
        <li key={i}>
         <div
          className='dashboard-TrendImg'
          style={{
           backgroundImage: `url(${trendgames.img})`,
          }}
         ></div>
         <h3 className='globalHeader' style={{ color: 'red' }}>
          {trendgames.name}
         </h3>
        </li>
       ))}
      </ul>
     </div>
    </div>
    <div className='dashboard-Games'>
     <ul></ul>
    </div>
   </div>
  );
 } else {
  return (
   <div className='dashboard'>
    <h1 className='globalHeader' style={{ color: 'white' }}>
     Dashboard!
    </h1>
    <div className='dashGrid'>
     <div className='dashboard-Trending'>
      <h2 className='sticky globalHeader' style={{ color: 'red' }}>
       Trending Streams
      </h2>
      <ul>
       {trendstream.map((trendstream, i) => (
        <li key={i}>
         <div
          className='dashboard-TrendImg'
          style={{
           backgroundImage: `url(${trendstream.img})`,
          }}
         ></div>
         <h3 className='globalHeader' style={{ color: 'red' }}>
          {trendstream.name}
         </h3>
        </li>
       ))}
      </ul>
     </div>
     <div className='dashboard-Trending'>
      <h2 className='sticky globalHeader' style={{ color: 'red' }}>
       Trending Games
      </h2>
      <ul>
       {trendgames.map((trendgames, i) => (
        <li key={i}>
         <div
          className='dashboard-TrendImg'
          style={{
           backgroundImage: `url(${trendgames.img})`,
          }}
         ></div>
         <h3 className='globalHeader' style={{ color: 'red' }}>
          {trendgames.name}
         </h3>
        </li>
       ))}
      </ul>
     </div>
    </div>
    <div className='dashboard-Games'>
     <ul></ul>
    </div>
   </div>
  );
 }
};

export default Dash;
