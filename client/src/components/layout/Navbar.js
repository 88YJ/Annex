import React, { Fragment, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';

const Navbar = ({ title, icon }) => {
 const authContext = useContext(AuthContext);

 const { isAuthenticated, logout, user } = authContext;

 const onLogout = () => {
  logout();
 };

 const authLinks = (
  <Fragment>
   <li>
    <Link to='/'>{user && user.name}</Link>
   </li>
   <li>
    <a onClick={onLogout} href='#!'>
     <span>Logout</span>
    </a>
   </li>
   <li>
    <Link to='/store'>Store</Link>
   </li>
   <li>
    <Link to='/stream'>Stream</Link>
   </li>
  </Fragment>
 );

 const guessLinks = (
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
   <h1>{title}</h1>
   <div className='Navlower'>
    <div>Server Settings</div>
    <div>
     <ul>{isAuthenticated ? authLinks : guessLinks}</ul>
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
 title: 'Annex',
};

export default Navbar;
