import React, { useContext, useEffect } from 'react';
import FindprofileContext from '../../context/findprofiles/findprofileContext';
import ProfileContext from '../../context/profile/profileContext';
import { Link } from 'react-router-dom';

const ProfileSearch = () => {
 const findprofileContext = useContext(FindprofileContext);
 const { profiles, getProfiles } = findprofileContext;

 const profileContext = useContext(ProfileContext);

 const { setCurrentProfile } = profileContext;

 useEffect(() => {
  getProfiles();
  // eslint-disable-next-line
 }, []);

 function openProfile(profile) {
  setCurrentProfile(profile);
 }

 return (
  <div className='serverfind'>
   <div className='serverfind'>
    <h3>Users:</h3>
    <div className='profilefind'>
     <ul>
      {profiles.map((profile) => (
       <Link to='/profilepage'>
        <li key={profile._id} onClick={() => openProfile(profile)}>
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
