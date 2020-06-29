import React, { useContext, useEffect } from 'react';
import FindprofileContext from '../../context/findprofiles/findprofileContext';

const Profile = () => {
 const findprofileContext = useContext(FindprofileContext);
 const { profiles, getProfiles } = findprofileContext;

 useEffect(() => {
  getProfiles();
  // eslint-disable-next-line
 }, []);

 return (
  <div className='serverfind'>
   <div className='serverfind'>
    <h3>Users:</h3>
    <div className='serverfind'>
     <ul>
      {profiles.map((profile) => (
       <li key={profile._id}>
        <div
         className='serverimgsmall'
         style={{
          backgroundImage: `url(${profile.profilePicture})`,
         }}
        ></div>
        <h3>{profile.name}</h3>
       </li>
      ))}
     </ul>
    </div>
   </div>
  </div>
 );
};

export default Profile;
