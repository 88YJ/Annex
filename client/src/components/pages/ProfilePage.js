import React, { useContext, useEffect } from "react";

import AuthContext from "../../context/auth/authContext";
import ProfileContext from "../../context/profile/profileContext";

const ProfilePage = () => {
 const authContext = useContext(AuthContext);

 const profileContext = useContext(ProfileContext);

 const {
  profile,
  incomingRequests,
  sendFriendRequest,
  acceptFriendRequest,
 } = profileContext;

 const { user } = authContext;

 useEffect(() => {
  authContext.loadUser();
  // eslint-disable-next-line
 }, []);

 const onSendFriendRequest = () => {
  sendFriendRequest();
 };

 function OnFriendRequestAccept(request) {
  acceptFriendRequest(request);
 }

 if (!profile || !user) {
  return <div></div>;
 }

 if (profile._id === user._id) {
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
     {incomingRequests.map((request, i) => (
      <li key={i}>
       <h4>{request.name}</h4>
       <div
        className='serverimgsmall'
        style={{
         backgroundImage: `url(${request.profilePicture})`,
        }}
       ></div>
       <button onClick={() => OnFriendRequestAccept(request._id)}>
        Accept Request
       </button>
      </li>
     ))}
    </ul>
   </div>
  );
 } else {
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
     <button onClick={onSendFriendRequest}>Send Friend Request</button>
    </ul>
   </div>
  );
 }
};

export default ProfilePage;
