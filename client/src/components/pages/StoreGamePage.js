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
  <div>
   <ul>
    {
     <li key={gamepage._id}>
      <div
       className='dashimg'
       style={{
        backgroundImage: `url(${gamepage.img})`,
       }}
      ></div>
      <h3 className='center'>{gamepage.name}</h3>
     </li>
    }
   </ul>
   <button onClick={add}>Add to cart</button>
  </div>
 );
};

export default StoreGamePage;
