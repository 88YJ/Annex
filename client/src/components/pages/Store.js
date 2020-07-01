import React, { useContext, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import TwoBeLogo from '../layout/TwoBeLogo.png';

import AuthContext from '../../context/auth/authContext';

import GameContext from '../../context/games/gameContext';

import ServerContext from '../../context/server/serverContext';

const Store = () => {
 const authContext = useContext(AuthContext);

 const gameContext = useContext(GameContext);

 const serverContext = useContext(ServerContext);

 const { hideServerSidebars } = serverContext;

 const { displayGamesSidebar, getGames } = gameContext;

 useEffect(() => {
  authContext.loadUser();
  displayGamesSidebar();
  hideServerSidebars();
  getGames();
  // eslint-disable-next-line
 }, []);

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
     <li>
      <div
       className='dashmygamesimg'
       style={{
        backgroundImage: `url('https://images3.alphacoders.com/835/thumb-1920-83519.jpg')`,
       }}
      ></div>
      Halo Wars
     </li>
     <li>
      <div
       className='dashmygamesimg'
       style={{
        backgroundImage: `url('https://images3.alphacoders.com/835/thumb-1920-83519.jpg')`,
       }}
      ></div>
      Halo Wars
     </li>
     <li>
      <div
       className='dashmygamesimg'
       style={{
        backgroundImage: `url('https://images3.alphacoders.com/835/thumb-1920-83519.jpg')`,
       }}
      ></div>
      Halo Wars
     </li>
     <li>
      <div
       className='dashmygamesimg'
       style={{
        backgroundImage: `url('https://images3.alphacoders.com/835/thumb-1920-83519.jpg')`,
       }}
      ></div>
      Halo Wars
     </li>
     <li>
      <div
       className='dashmygamesimg'
       style={{
        backgroundImage: `url('https://images3.alphacoders.com/835/thumb-1920-83519.jpg')`,
       }}
      ></div>
      Halo Wars
     </li>
     <li>
      <div
       className='dashmygamesimg'
       style={{
        backgroundImage: `url('https://images3.alphacoders.com/835/thumb-1920-83519.jpg')`,
       }}
      ></div>
      Halo Wars
     </li>
     <li>
      <div
       className='dashmygamesimg'
       style={{
        backgroundImage: `url('https://images3.alphacoders.com/835/thumb-1920-83519.jpg')`,
       }}
      ></div>
      Halo Wars
     </li>
     <li>
      <div
       className='dashmygamesimg'
       style={{
        backgroundImage: `url('https://images3.alphacoders.com/835/thumb-1920-83519.jpg')`,
       }}
      ></div>
      Halo Wars
     </li>
     <li>
      <div
       className='dashmygamesimg'
       style={{
        backgroundImage: `url('https://images3.alphacoders.com/835/thumb-1920-83519.jpg')`,
       }}
      ></div>
      Halo Wars
     </li>
     <li>
      <div
       className='dashmygamesimg'
       style={{
        backgroundImage: `url('https://images3.alphacoders.com/835/thumb-1920-83519.jpg')`,
       }}
      ></div>
      Halo Wars
     </li>
     <li>
      <div
       className='dashmygamesimg'
       style={{
        backgroundImage: `url('https://images3.alphacoders.com/835/thumb-1920-83519.jpg')`,
       }}
      ></div>
      Halo Wars
     </li>
     <li>
      <div
       className='dashmygamesimg'
       style={{
        backgroundImage: `url('https://images3.alphacoders.com/835/thumb-1920-83519.jpg')`,
       }}
      ></div>
      Halo Wars
     </li>
     <li>
      <div
       className='dashmygamesimg'
       style={{
        backgroundImage: `url('https://images3.alphacoders.com/835/thumb-1920-83519.jpg')`,
       }}
      ></div>
      Halo Wars
     </li>
     <li>
      <div
       className='dashmygamesimg'
       style={{
        backgroundImage: `url('https://images3.alphacoders.com/835/thumb-1920-83519.jpg')`,
       }}
      ></div>
      Halo Wars
     </li>
     <li>
      <div
       className='dashmygamesimg'
       style={{
        backgroundImage: `url('https://images3.alphacoders.com/835/thumb-1920-83519.jpg')`,
       }}
      ></div>
      Halo Wars
     </li>
     <li>
      <div
       className='dashmygamesimg'
       style={{
        backgroundImage: `url('https://images3.alphacoders.com/835/thumb-1920-83519.jpg')`,
       }}
      ></div>
      Halo Wars
     </li>
     <li>
      <div
       className='dashmygamesimg'
       style={{
        backgroundImage: `url('https://images3.alphacoders.com/835/thumb-1920-83519.jpg')`,
       }}
      ></div>
      Halo Wars
     </li>
     <li>
      <div
       className='dashmygamesimg'
       style={{
        backgroundImage: `url('https://images3.alphacoders.com/835/thumb-1920-83519.jpg')`,
       }}
      ></div>
      Halo Wars
     </li>
     <li>
      <div
       className='dashmygamesimg'
       style={{
        backgroundImage: `url('https://images3.alphacoders.com/835/thumb-1920-83519.jpg')`,
       }}
      ></div>
      Halo Wars
     </li>
     <li>
      <div
       className='dashmygamesimg'
       style={{
        backgroundImage: `url('https://images3.alphacoders.com/835/thumb-1920-83519.jpg')`,
       }}
      ></div>
      Halo Wars
     </li>
    </ul>
   </div>
  </Fragment>
 );
};

export default Store;
