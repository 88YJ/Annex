import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';

import '../chatcss/Join.css';

export default function SignIn() {
 const authContext = useContext(AuthContext);

 const { user } = authContext;

 let room = 'hithere';

 return (
  <div className='joinOuterContainer'>
   <div className='joinInnerContainer'>
    <h1 className='heading'>Join</h1>
    <div></div>
    <div></div>
    <Link
     onClick={(e) => (!user && user.name ? e.preventDefault() : null)}
     to={`/chat?name=${user && user.name}&room=${room}`}
    >
     <button className={'button mt-20'} type='submit'>
      Sign In
     </button>
    </Link>
   </div>
  </div>
 );
}
