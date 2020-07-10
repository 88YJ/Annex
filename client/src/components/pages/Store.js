import React, { useContext, useEffect, Fragment, useRef } from 'react';
import { Link } from 'react-router-dom';
import TwoBeLogo from '../layout/TwoBeLogo.png';

import AuthContext from '../../context/auth/authContext';

import GameContext from '../../context/games/gameContext';

import ServerContext from '../../context/server/serverContext';

import StoreContext from '../../context/store/storeContext';

const Store = () => {
 const authContext = useContext(AuthContext);

 const gameContext = useContext(GameContext);

 const storeContext = useContext(StoreContext);

 const serverContext = useContext(ServerContext);

 const { hideServerSidebars } = serverContext;

 const { getGames } = gameContext;

 const text = useRef('');

 const {
  storegames,
  getStoreGames,
  displayCartSidebar,
  setCurrentGame,
  filterStoreGames,
  filtered,
 } = storeContext;

 useEffect(() => {
  authContext.loadUser();
  displayCartSidebar();
  hideServerSidebars();
  getGames();
  getStoreGames();
  // eslint-disable-next-line
 }, []);

 const onChange = (e) => {
  if (text.current.value !== '') {
   filterStoreGames(e.target.value);
  } else {
  }
 };

 function openGamePage(games) {
  setCurrentGame(games);
 }

 return (
  <Fragment>
   <div className='storeNav'>
    <div></div>
    <div>
     <ul>
      <li>
       <input
        type={text}
        onChange={onChange}
        className='GamesSearch'
        placeholder='Search Games'
       />
      </li>
      <li>
       <Link to='#'>Clear Filter</Link>
      </li>
      <li>
       <Link to='#'>Selected For You</Link>
      </li>
      <li>
       <Link to='#'>Popular Games</Link>
      </li>
      <li>
       <Link to='#'>Community</Link>
      </li>
     </ul>
    </div>
    <div></div>
   </div>
   <div className='storepage'>
    <ul>
     {filtered !== null
      ? filtered.map((games, i) => (
         <Link to='/storegamepage' key={i}>
          <li onClick={() => openGamePage(games)}>
           <div
            className='dashmygamesimg'
            style={{
             backgroundImage: `url(${games.img})`,
            }}
           ></div>
          </li>
         </Link>
        ))
      : storegames.map((games, i) => (
         <Link to='/storegamepage' key={i}>
          <li onClick={() => openGamePage(games)}>
           <div
            className='dashmygamesimg'
            style={{
             backgroundImage: `url(${games.img})`,
            }}
           ></div>
          </li>
         </Link>
        ))}
    </ul>
   </div>
  </Fragment>
 );
};

export default Store;
