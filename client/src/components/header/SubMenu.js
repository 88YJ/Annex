import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthDispatch, logout } from '../../pages/authentication/context';

export const SubMenu = (props) => {
  const authDispatch = useAuthDispatch();

  const { type } = props;

  if (type === 'Home') {
    return (
      <>
        <div className='NavSubMenu'>
          <h1 className='globalHeader' style={{ color: 'red' }}>
            Home
          </h1>
          <ul>
            <li>
              <Link to='/'>My Profile</Link>
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
  } else if (type === 'Shop') {
    return (
      <>
        <div className='NavSubMenu'>
          <h1 className='globalHeader' style={{ color: 'red' }}>
            Shop
          </h1>
          <ul>
            <li>
              <Link to='/'>Go To Cart</Link>
            </li>
            <li>
              <Link to='/'>Wishlist</Link>
            </li>
            <li>
              <Link to='/'>Featured</Link>
            </li>
          </ul>
        </div>
      </>
    );
  } else if (type === 'Stream') {
    return (
      <>
        <div></div>
      </>
    );
  }
};
