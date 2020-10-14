import React, { useContext, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import StoreContext from '../../context/store/storeContext';
import ServerContext from '../../context/server/serverContext';

const StoreGamePage = () => {
 const authContext = useContext(AuthContext);

 const storeContext = useContext(StoreContext);

 const serverContext = useContext(ServerContext);

 const { gamescart, buyGame, displayCartSidebar } = storeContext;

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
 if (gamescart !== null) {
  return (
   <div className='store-Cartpage'>
    <ul>
     {gamescart.map((cart, i) => (
      <li key={i}>
       <h3 className='store-Gamepage-Headers' style={{ color: 'red' }}>
        {cart.name}
       </h3>
       <div
        className='store-Cartpage-Img'
        style={{
         backgroundImage: `url(${cart.wideimg})`,
        }}
       ></div>
       <h3 className='store-Gamepage-Headers' style={{ color: 'red' }}>
        Price: $60.00
       </h3>
       <button
        style={{ height: 'auto', width: 'auto' }}
        className='globalbutton'
       >
        Remove From Cart
       </button>
      </li>
     ))}
    </ul>
    <div>
     <button
      style={{ height: 'auto', width: 'auto' }}
      onClick={buy}
      className='globalbutton'
     >
      Buy
     </button>
     <h3 style={{ color: 'red' }}>Total: $60.00</h3>
    </div>
   </div>
  );
 } else {
  return <Redirect to='/store' />;
 }
};

export default StoreGamePage;
