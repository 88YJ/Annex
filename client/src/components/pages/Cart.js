import React, { useContext, useEffect } from 'react';

import AuthContext from '../../context/auth/authContext';
import StoreCartContext from '../../context/storecart/storecartContext';
import ServerContext from '../../context/server/serverContext';

const StoreGamePage = () => {
 const authContext = useContext(AuthContext);

 const storecartContext = useContext(StoreCartContext);

 const serverContext = useContext(ServerContext);

 const { gamescart, buyGame, displayCartSidebar } = storecartContext;

 const { hideServerSidebars } = serverContext;

 useEffect(() => {
  authContext.loadUser();
  displayCartSidebar();
  hideServerSidebars();

  // eslint-disable-next-line
 }, []);

 function buy() {
  let game = gamescart[0];
  buyGame(game);
 }

 return (
  <div>
   <ul>
    {gamescart.map((cart, i) => (
     <li key={i}>
      <div
       className='dashimg'
       style={{
        backgroundImage: `url(${cart.img})`,
       }}
      ></div>
      <h3 className='center'>{cart.name}</h3>
     </li>
    ))}
   </ul>
   <button onClick={buy}>Buy</button>
  </div>
 );
};

export default StoreGamePage;
