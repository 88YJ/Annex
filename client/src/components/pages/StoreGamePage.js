import React, { useContext, useEffect } from 'react';

import AuthContext from '../../context/auth/authContext';
import GameStoreContext from '../../context/gamestorepage/gamestoreContext';
import StoreCartContext from '../../context/storecart/storecartContext';

const StoreGamePage = () => {
 const authContext = useContext(AuthContext);

 const gamestoreContext = useContext(GameStoreContext);

 const storecartContext = useContext(StoreCartContext);

 const { gamepage } = gamestoreContext;

 const { addToCart } = storecartContext;

 useEffect(() => {
  authContext.loadUser();

  // eslint-disable-next-line
 }, []);

 function add() {
  addToCart(gamepage);
 }

 return (
  <div
   className='gamestorepage'
   style={{
    backgroundImage: `url(${gamepage.img})`,
   }}
  >
   <div className='film'>
    <div className='storepagecomponents'>
     <h1 className='center'>{gamepage.name}</h1>
     <div className='storepagecomponent1'>
      <div className='storepagecomponent2'>
       <div
        className='gamestorepageimg'
        style={{
         backgroundImage: `url(${gamepage.img})`,
        }}
       ></div>
       <p>Game Discription</p>
      </div>
      <div className='storepagecomponent2'>
       <div>
        Rating out of 5:
        <button onClick={add} className='addcartbutton'>
         Add to cart
        </button>
       </div>
       <div>Review Comments</div>
      </div>
     </div>
    </div>
   </div>
  </div>
 );
};

export default StoreGamePage;
