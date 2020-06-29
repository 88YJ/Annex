import React, { useContext, useEffect } from 'react';

import AuthContext from '../../context/auth/authContext';
import ProfileContext from '../../context/profile/profileContext';

const ProfilePage = () => {
 const authContext = useContext(AuthContext);

 const profileContext = useContext(ProfileContext);

 const { profile } = profileContext;

 useEffect(() => {
  authContext.loadUser();
  // eslint-disable-next-line
 }, []);

 return (
  <div>
   <ul>
    {
     <li key={profile._id}>
      <div
       className='dashimg'
       style={{
        backgroundImage: `url(${profile.profilePicture})`,
       }}
      ></div>
      <h3 className='center'>{profile.name}</h3>
     </li>
    }
   </ul>
  </div>
 );
};

export default ProfilePage;
