import React from 'react';
import { Link } from 'react-router-dom';
import { useShopState, useShopDispatch, buyGame } from './context';
import { findOwnedGames, useProfileDispatch } from '../profile/context';

export const Cart = () => {
  const { cart } = useShopState();
  const shopDispatch = useShopDispatch();
  const profileDispatch = useProfileDispatch();

  function buyButton(gameid) {
    buyGame(shopDispatch, gameid);
    findOwnedGames(profileDispatch);
  }

  if (cart) {
    return (
      <div className='store-Cartpage'>
        <ul>
          {cart.map((item, i) => (
            <li key={i}>
              <h3 className='store-Gamepage-Headers' style={{ color: 'red' }}>
                {item.name}
              </h3>
              <div
                className='store-Cartpage-Img'
                style={{
                  backgroundImage: `url(${item.wideimg})`,
                }}
              ></div>
              <h3 className='store-Gamepage-Headers' style={{ color: 'red' }}>
                Price: $60.00
              </h3>
              <button style={{ height: 'auto', width: 'auto' }} className='globalbutton'>
                Remove From Cart
              </button>
            </li>
          ))}
        </ul>
        <div>
          <Link to='/shop' style={{ height: 'auto', width: 'auto' }} onClick={() => buyButton(cart)} className='globalbutton'>
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
