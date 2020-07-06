import React, { useContext, useEffect } from 'react';
import ProfileContext from '../../context/profile/profileContext';
import { Link } from 'react-router-dom';

const ProfileSearch = () => {
 const profileContext = useContext(ProfileContext);

 const { profiles, getProfiles, getIdProfile } = profileContext;

 useEffect(() => {
  getProfiles();
  // eslint-disable-next-line
 }, []);

 function openProfile(profile) {
  getIdProfile(profile);
 }

 return (
  <div className='serverfind'>
   <div className='serverfind'>
    <h3>Users:</h3>
    <div className='profilefind'>
     <ul>
      {profiles.map((profile, i) => (
       <Link to='/profilepage' key={i}>
        <li onClick={() => openProfile(profile)}>
         <div
          className='serverimgsmall'
          style={{
           backgroundImage: `url(${profile.profilePicture})`,
          }}
         ></div>
         <h3>{profile.name}</h3>
        </li>
       </Link>
      ))}
     </ul>
    </div>
   </div>
  </div>
 );
};

export default ProfileSearch;
