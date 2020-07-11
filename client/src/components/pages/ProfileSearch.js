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
  <div className='profilesearch'>
   <div className='profilesearch'>
    <h1>Users:</h1>
    <div className='profilefind'>
     <ul>
      {profiles.map((profile, i) => (
       <Link to='/profilepage' key={i} onClick={() => openProfile(profile)}>
        <li
         className='banner'
         style={{ backgroundImage: `url(${profile.profileBanner})` }}
        >
         <br />
         <br />
         <div
          className='serverimgsmall'
          style={{
           backgroundImage: `url(${profile.profilePicture})`,
           border: 'black 3px solid',
          }}
         ></div>
         <h2 style={{ backgroundColor: 'rgb(0,0,0, .8)' }}>{profile.name}</h2>
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
