import React, { useContext, useEffect } from 'react';

import AuthContext from '../../context/auth/authContext';
import GameStoreContext from '../../context/gamestorepage/gamestoreContext';

const ProfilePage = () => {
 const authContext = useContext(AuthContext);

 const gamestoreContext = useContext(GameStoreContext);

 const { gamepage } = gamestoreContext;

 useEffect(() => {
  authContext.loadUser();
  // eslint-disable-next-line
 }, []);

 return (
  <div>
   <ul>
    {
     <li key={gamepage._id}>
      <div
       className='dashimg'
       style={{
        backgroundImage: `url(${gamepage.img})`,
       }}
      ></div>
      <h3 className='center'>{gamepage.name}</h3>
     </li>
    }
   </ul>
  </div>
 );
};

export default ProfilePage;
