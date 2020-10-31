import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import DashContext from '../../context/dash/dashContext';
import GameContext from '../../context/games/gameContext';
import ServerContext from '../../context/server/serverContext';
import StoreContext from '../../context/store/storeContext';

import Card from '../app-components/Card';
import Arrow from '../layout/Arrow.png';

const Dash = () => {
 var trendingstreams = [];
 var trendinggames = [];

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

 console.log(trendstream);

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

 var streamRef = React.createRef();
 var gamesRef = React.createRef();
 function getData() {
  trendingstreams = trendstream;
  trendinggames = trendgames;
 }

 function nextClick(reference) {
  let slide;

  if (reference == 'stream') {
   slide = streamRef.current;
  } else if (reference == 'game') {
   slide = gamesRef.current;
  }

  slide.scrollLeft += slide.offsetWidth;
  if (slide.scrollLeft >= slide.scrollWidth - slide.offsetWidth) {
   slide.scrollLeft = 0;
  }
 }
 function prevClick(reference) {
  let slide;

  if (reference == 'stream') {
   slide = streamRef.current;
  } else if (reference == 'game') {
   slide = gamesRef.current;
  }

  slide.scrollLeft -= slide.offsetWidth;
  if (slide.scrollLeft <= 0) {
   slide.scrollLeft = slide.scrollWidth;
  }
 }

 if (games !== null && isAuthenticated) {
  getData();

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
      <div className='wrapper'>
       <div className='trendy' ref={streamRef}>
        <Card data={trendingstreams} />
       </div>
       <div className='row'>
        <div className='prev' onClick={() => prevClick('stream')}>
         <img src={Arrow} alt='' />
        </div>
        <div className='next' onClick={() => nextClick('stream')}>
         <img src={Arrow} alt='' />
        </div>
       </div>
      </div>
     </div>
     <div className='dashboard-Trending'>
      <h2 className='sticky globalHeader' style={{ color: 'red' }}>
       Trending Games For You!
      </h2>
      <div className='wrapper'>
       <div className='trendy' ref={gamesRef}>
        <Card data={trendinggames} />
       </div>
       <div className='row'>
        <div className='prev' onClick={() => prevClick('game')}>
         <img src={Arrow} alt='' />
        </div>
        <div className='next' onClick={() => nextClick('game')}>
         <img src={Arrow} alt='' />
        </div>
       </div>
      </div>
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
      <div className='wrapper'>
       <div className='trendy' ref={streamRef}>
        <Card data={trendingstreams} />
       </div>
       <div className='row'>
        <div className='prev' onClick={() => prevClick('stream')}>
         <img src={Arrow} alt='' />
        </div>
        <div className='next' onClick={() => nextClick('stream')}>
         <img src={Arrow} alt='' />
        </div>
       </div>
      </div>
     </div>
     <div className='dashboard-Trending'>
      <h2 className='sticky globalHeader' style={{ color: 'red' }}>
       Trending Games For You!
      </h2>
      <div className='wrapper'>
       <div className='trendy' ref={gamesRef}>
        <Card data={trendinggames} />
       </div>
       <div className='row'>
        <div className='prev' onClick={() => prevClick('game')}>
         <img src={Arrow} alt='' />
        </div>
        <div className='next' onClick={() => nextClick('game')}>
         <img src={Arrow} alt='' />
        </div>
       </div>
      </div>
     </div>
    </div>
    <div className='dashboard-Games'>
     <ul></ul>
    </div>
   </div>
  );
 } else {
  return <div className='dashboard'></div>;
 }
};

export default Dash;
