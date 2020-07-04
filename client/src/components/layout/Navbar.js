import React, { Fragment, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import ProfileContext from '../../context/profile/profileContext';
import TwoBeLogo from './TwoBeLogo.png';

const Navbar = ({ title, icon }) => {
 const authContext = useContext(AuthContext);

 const profileContext = useContext(ProfileContext);

 const { isAuthenticated, logout, user } = authContext;

 const { setCurrentProfile } = profileContext;

 const onLogout = () => {
  logout();
 };

 function openProfile(profile) {
  setCurrentProfile(profile);
 }

 const authLinks = (
  <Fragment>
   <li>
    <div
     className='profilepicture'
     style={{ backgroundImage: `url(${user && user.profilePicture})` }}
    ></div>
   </li>
   <li>
    <Link to='/'>{user && user.name}</Link>
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
   </li>
   <li>
    <Link to='/store'>Store</Link>
    <div className='subMenu'>
     <ul>
      <li>
       <Link to='/cart'>Cart</Link>
      </li>
     </ul>
    </div>
   </li>
   <li>
    <Link to='/stream'>Stream</Link>
   </li>
   <li>
    <Link to='#'>Search</Link>
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
   </li>
  </Fragment>
 );

 const guestLinks = (
  <Fragment>
   <li>
    <Link to='/register'>Register</Link>
   </li>
   <li>
    <Link to='/login'>Login</Link>
   </li>
  </Fragment>
 );

 return (
  <div className='Nav'>
   <h1>
    {title}
    <span className='golden'>Prototype</span>
   </h1>

   <div className='Navlower'>
    <div></div>
    <div>
     <ul>{isAuthenticated ? authLinks : guestLinks}</ul>
    </div>
   </div>
  </div>
 );
};

Navbar.propTypes = {
 title: PropTypes.string.isRequired,
 icon: PropTypes.string,
};

Navbar.defaultProps = {
 title: '{Annex} ',
};

export default Navbar;
