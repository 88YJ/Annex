import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useAuthState, useAuthDispatch, logout } from '../../pages/authentication/context';

//Component imports
import { ServerList } from './ServerList';
import { SubMenu } from './SubMenu';

//Import images
import PlusIcon from '../../images/PlusIcon.png';
import SearchIcon from '../../images/SearchIcon.png';
import StreamIcon from '../../images/StreamIcon.png';
import CartIcon from '../../images/CartIcon.png';

export const Header = () => {
  const { user, isLoggedIn } = useAuthState();
  const authDispatch = useAuthDispatch();

  let navigationLinks;

  if (isLoggedIn) {
    navigationLinks = (
      <Fragment>
        <li>
          <Link to='/'>
            <div className='NavIcons' style={{ backgroundImage: `url(${user.profilePicture})` }} />
          </Link>
          <SubMenu type={'Home'} />
        </li>
        <li>
          <Link to='/store'>
            <div className='NavIcons' style={{ backgroundImage: `url(${CartIcon})` }} />
          </Link>
          <SubMenu type={'Shop'} />
        </li>
        <li>
          <Link to='/'>
            <div className='NavIcons' style={{ backgroundImage: `url(${StreamIcon})` }} />
          </Link>
        </li>
        <li>
          <Link to='/'>
            <div
              className='NavIcons'
              style={{
                backgroundImage: `url(${SearchIcon})`,
              }}
            ></div>
          </Link>
        </li>
        <li style={{ marginTop: '3px', borderBottom: 'red 1px solid', paddingBottom: '4px', cursor: 'pointer' }} key='addServer' /*onClick={displayModal}*/>
          <div className='NavIcons' style={{ backgroundImage: `url(${PlusIcon})` }} />
        </li>
      </Fragment>
    );
  } else {
    navigationLinks = (
      <Fragment>
        <li>
          <Link to='/'>Dashoard</Link>
        </li>
        <li>
          <Link to='/register'>Register</Link>
        </li>
        <li>
          <Link to='/login'>Login</Link>
        </li>
      </Fragment>
    );
  }
  return (
    <div className='Nav'>
      <ul>
        {navigationLinks}
        <ServerList />
      </ul>
      <div className='NavSubMenu'></div>
    </div>
  );
};
