import React, { Fragment, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import ProfileContext from '../../context/profile/profileContext';
import ModalContext from '../../context/modal/modalContext';
import ServerContext from '../../context/server/serverContext';
import PlusIcon from './Plusicon.png';
import SearchIcon from './SearchIcon.png';

const Navbar = ({ title }) => {
 const authContext = useContext(AuthContext);

 const profileContext = useContext(ProfileContext);

 const modalContext = useContext(ModalContext);

 const serverContext = useContext(ServerContext);

 const { isAuthenticated, logout, user } = authContext;

 const { getIdProfile } = profileContext;

 const { showModalWithAddServer } = modalContext;

 const {
  setCurrentServer,
  serverLogo,
  userServerList,
  getUserServers,
 } = serverContext;

 useEffect(() => {
  getUserServers();
  // eslint-disable-next-line
 }, []);

 const onLogout = () => {
  logout();
 };

 function openProfile(profile) {
  getIdProfile(profile);
 }

 const displayModal = () => {
  showModalWithAddServer();
 };

 function openServer(server) {
  setCurrentServer(server);
 }

 const authLinks = (
  <Fragment>
   <li>
    <Link to='/'>
     <div
      className='navpicture'
      style={{ backgroundImage: `url(${user && user.profilePicture})` }}
     >
      <div className='subMenu'>
       <ul>
        <li onClick={() => openProfile(user)}>
         <Link to='/profilepage'>My Profile</Link>
        </li>
        <li>
         <a onClick={onLogout} href='#!'>
          <span>Logout</span>
         </a>
        </li>
       </ul>
      </div>
     </div>
    </Link>
   </li>
   <li>
    <Link to='/store'>
     <div
      className='navicons'
      style={{
       backgroundImage: `url("https://png.pngtree.com/png-vector/20190329/ourlarge/pngtree-vector-shopping-cart-icon-png-image_889692.jpg")`,
      }}
     ></div>
    </Link>
    <div className='subMenu'>
     <ul>
      <li>
       <Link to='/cart'>Cart</Link>
      </li>
     </ul>
    </div>
   </li>
   <li>
    <Link to='/redirectstream'>
     <div
      className='navicons'
      style={{
       backgroundImage: `url("https://faithvox.s3.amazonaws.com/wp-content/uploads/sites/5/2016/09/05195814/live.jpg")`,
      }}
     ></div>
    </Link>
   </li>
   <li>
    <Link to='/redirectstream'>
     <div
      className='navicons'
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
    onClick={displayModal}
   >
    <div
     className='navicons'
     style={{
      backgroundImage: `url(${PlusIcon})`,
     }}
    ></div>
   </li>
  </Fragment>
 );

 const guestLinks = (
  <Fragment>
   <li>
    <Link to='/'>Dash</Link>
   </li>
   <li>
    <Link to='/register'>Register</Link>
   </li>
   <li>
    <Link to='/login'>Login</Link>
   </li>
  </Fragment>
 );

 if (userServerList !== null) {
  return (
   <div className='Nav'>
    <div className='Navlower'>
     <div>
      <ul>
       {isAuthenticated ? authLinks : guestLinks}
       {userServerList.map((server, i) => (
        <Link to={`/serverlanding`} key={i}>
         <li onClick={() => openServer(server)}>
          <div
           className='navpicture'
           style={{
            backgroundImage: `url(${server.img})`,
           }}
          ></div>
         </li>
        </Link>
       ))}
      </ul>
     </div>
    </div>
   </div>
  );
 } else {
  return (
   <div className='Nav'>
    <div className='Navlower'>
     <div>
      <ul>{isAuthenticated ? authLinks : guestLinks}</ul>
     </div>
    </div>
   </div>
  );
 }
};

Navbar.propTypes = {
 title: PropTypes.string.isRequired,
 icon: PropTypes.string,
};

Navbar.defaultProps = {
 title: '{Clutch} ',
};

export default Navbar;

/* <li>
<Link to='#'>Community</Link>
<div className='subMenu'>
 <ul>
  <li>
   <Link to='/findservers'>Servers Search</Link>
  </li>
  <li>
   <Link to='/profilesearch'>Profile Search</Link>
  </li>
 </ul>
</div>
</li> */
