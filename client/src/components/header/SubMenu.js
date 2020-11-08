import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthState, useAuthDispatch, logout } from '../../pages/authentication/context';

import { SHOW_SHOP_SUBMENU, SHOW__HOME_SUBMENU, SHOW_STREAM_SUBMENU } from './types/types';
import { SubMenuCart } from './SubMenuCart';

export const SubMenu = (props) => {
  const authDispatch = useAuthDispatch();
  const { user } = useAuthState();

  const { type } = props;

  switch (type) {
    case SHOW__HOME_SUBMENU:
      return (
        <>
          <div className='NavSubMenu'>
            <h1 className='globalHeader' style={{ color: 'red' }}>
              Home
            </h1>
            <ul>
              <li>
                <Link to={`/profile/${user._id}`}>My Profile</Link>
              </li>
              <li>
                <Link to='#'>Community</Link>
              </li>
              <li>
                <Link to='#'>Market</Link>
              </li>
              <li>
                <Link to='/' onClick={() => logout(authDispatch)}>
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        </>
      );
    case SHOW_SHOP_SUBMENU:
      return (
        <>
          <div className='NavSubMenu'>
            <h1 className='globalHeader' style={{ color: 'red' }}>
              Shop
            </h1>
            <ul>
              <li>
                <Link to='/'>Featured</Link>
              </li>
              <li>
                <Link to='/'>Wishlist</Link>
              </li>
              <li>
                <Link to='/'>Stats</Link>
              </li>
              <li>
                <Link to='/shop/cart'>Go To Cart</Link>
              </li>
              <SubMenuCart />
            </ul>
          </div>
        </>
      );
    case SHOW_STREAM_SUBMENU:
      return (
        <>
          <div className='NavSubMenu'>
            <h1 className='globalHeader' style={{ color: 'red' }}>
              Stream
            </h1>
          </div>
        </>
      );
    default:
      return null;
  }
};
