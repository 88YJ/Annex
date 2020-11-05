import React from 'react';
import { Link } from 'react-router-dom';
import { useShopState } from '../../pages/shop/context';

export const SubMenuCart = () => {
  const { cart } = useShopState();

  if (cart) {
    return (
      <div className='R-Sidebar-Gamelist' style={{ height: 'auto' }}>
        <h3 className='globalHeader' style={{ background: 'black', color: 'red' }}>
          Cart:
        </h3>
        <Link to={`/shop/page/${cart._id}`}>
          <div className='gamelist-Games' style={{ height: 'auto' }}>
            <ul style={{ margin: '0', padding: '0' }}>
              <li className='banner' style={{ backgroundImage: `url(${cart.banner})`, margin: '0', padding: '0' }}>
                <div className='banner-Film'>
                  <p style={{ fontSize: '20px', height: 'auto', textAlign: 'center' }}>{cart.name}</p>
                </div>
              </li>
            </ul>
          </div>
        </Link>
      </div>
    );
  } else {
    return null;
  }
};
