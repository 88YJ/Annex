import React, { useContext, useEffect, Fragment, useRef } from 'react';
import { Link } from 'react-router-dom';

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
   <div className='store-Nav'>
    <ul>
     <li>
      <input
       type={text}
       onChange={onChange}
       className='store-Searchbar'
       placeholder='Search Games'
      />
     </li>
     <li>
      <Link
       to='#'
       style={{ height: 'auto', width: 'auto' }}
       className='globalbutton'
      >
       Clear Filter
      </Link>
     </li>
     <li>
      <Link
       to='#'
       style={{ height: 'auto', width: 'auto' }}
       className='globalbutton'
      >
       Selected For You
      </Link>
     </li>
     <li>
      <Link
       to='#'
       style={{ height: 'auto', width: 'auto' }}
       className='globalbutton'
      >
       Popular Games
      </Link>
     </li>
     <li>
      <Link
       to='#'
       style={{ height: 'auto', width: 'auto' }}
       className='globalbutton'
      >
       Community
      </Link>
     </li>
    </ul>
   </div>
   <div className='store-Listpage'>
    <ul>
     {filtered !== null
      ? filtered.map((games, i) => (
         <Link to='/storegamepage' key={i}>
          <li onClick={() => openGamePage(games)}>
           <div
            className='store-GamesImg'
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
            className='store-GamesImg'
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
