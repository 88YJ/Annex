import React, { useContext, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import TwoBeLogo from '../layout/TwoBeLogo.png';

import AuthContext from '../../context/auth/authContext';

import GameContext from '../../context/games/gameContext';

import ServerContext from '../../context/server/serverContext';

import StoreContext from '../../context/store/storeContext';

import GameStoreContext from '../../context/gamestorepage/gamestoreContext';

import StoreCartContext from '../../context/storecart/storecartContext';

const Store = () => {
 const authContext = useContext(AuthContext);

 const gameContext = useContext(GameContext);

 const storeContext = useContext(StoreContext);

 const serverContext = useContext(ServerContext);

 const gamestoreContext = useContext(GameStoreContext);

 const storecartContext = useContext(StoreCartContext);

 const { hideServerSidebars } = serverContext;

 const { getGames } = gameContext;

 const { storegames, getStoreGames } = storeContext;

 const { setCurrentGame } = gamestoreContext;

 const { displayCartSidebar } = storecartContext;

 useEffect(() => {
  authContext.loadUser();
  displayCartSidebar();
  hideServerSidebars();
  getGames();
  getStoreGames();
  // eslint-disable-next-line
 }, []);

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
       <input type='text' className='GamesSearch' value='Search Games' />
      </li>
      <li>
       <Link to='#'>Selected For You</Link>
      </li>
      <li>
       <Link to='#'>Games</Link>
      </li>
      <li>
       <Link to='#'>Community</Link>
      </li>
      <li>
       <Link to='#'>Mods</Link>
      </li>
     </ul>
    </div>
    <div></div>
   </div>
   <div className='storepage'>
    <ul>
     {storegames.map((games, i) => (
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
