import React, { useContext, useEffect } from 'react';

import AuthContext from '../../context/auth/authContext';

const ChatSidebar = () => {
 const authContext = useContext(AuthContext);

 useEffect(() => {
  authContext.loadUser();
  // eslint-disable-next-line
 }, []);

 return (
  <div>
   <div className='serverchannels'>
    <h3 className='center'>Server:</h3>
   </div>
  </div>
 );
};

export default ChatSidebar;
