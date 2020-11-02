import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import {
 useAuthState,
 useAuthDispatch,
 logout,
} from '../../pages/authentication/context';
import { ServerList } from './ServerList';

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
      <div
       className='NavIcons'
       style={{ backgroundImage: `url(${user.profilePicture})` }}
      >
       <ul>
        <li>
         <Link to='/'>My Profile</Link>
        </li>
        <li>
         <Link to='/' onClick={() => logout(authDispatch)}>
          Logout
         </Link>
        </li>
       </ul>
      </div>
     </Link>
    </li>
    <li>
     <Link to='/store'>
      <div
       className='NavIcons'
       style={{
        backgroundImage: `url(${CartIcon})`,
       }}
      >
       <ul>
        <li>
         <Link to='/'>Cart</Link>
        </li>
       </ul>
      </div>
     </Link>
    </li>
    <li>
     <Link to='/'>
      <div
       className='NavIcons'
       style={{
        backgroundImage: `url(${StreamIcon})`,
       }}
      ></div>
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
    <li
     style={{
      borderBottom: 'red 1px solid',
      paddingBottom: '4px',
      cursor: 'pointer',
     }}
     key='addServer'
     /*onClick={displayModal}*/
    >
     <div
      className='NavIcons'
      style={{
       backgroundImage: `url(${PlusIcon})`,
      }}
     ></div>
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
  </div>
 );
};
