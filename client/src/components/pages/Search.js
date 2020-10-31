import React, { useContext, useEffect } from 'react';
import ProfileContext from '../../context/profile/profileContext';
import ServerContext from '../../context/server/serverContext';
import { Link } from 'react-router-dom';
import Search from '../app-components/Search';

const ProfileSearch = () => {
 var profilelist = [];
 var serverlist = [];

 const profileContext = useContext(ProfileContext);

 const { profiles, getProfiles, getIdProfile } = profileContext;

 const serverContext = useContext(ServerContext);

 const { servers, getServers, updateServerUserList } = serverContext;

 useEffect(() => {
  getProfiles();
  getServers();
  // eslint-disable-next-line
 }, []);

 function openProfile(profile) {
  getIdProfile(profile);
 }
 function joinServer(server) {
  updateServerUserList(server);
 }

 profilelist = profiles;
 serverlist = servers;

 return (
  <div className='search'>
   <Search data={profilelist} profile={true} openProfile={openProfile} />
   <Search data={serverlist} server={true} joinServer={joinServer} />
  </div>
 );
};

export default ProfileSearch;
