import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useShopState, useShopDispatch, buyGame } from './context';

export const Cart = () => {
  const { cart } = useShopState();
  const shopDispatch = useShopDispatch();

  if (cart) {
    return (
      <div className='store-Cartpage'>
        <ul>
          <li>
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
            <button style={{ height: 'auto', width: 'auto' }} className='globalbutton'>
              Remove From Cart
            </button>
          </li>
        </ul>
        <div>
          <Link to='/shop' style={{ height: 'auto', width: 'auto' }} onClick={() => buyGame(shopDispatch, cart._id)} className='globalbutton'>
            Buy
          </Link>
          <h3 style={{ color: 'red' }}>Total: $60.00</h3>
        </div>
      </div>
    );
  } else {
    return null;
  }
};
