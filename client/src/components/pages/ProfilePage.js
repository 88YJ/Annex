import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import ProfileContext from '../../context/profile/profileContext';
import ServerContext from '../../context/server/serverContext';
import ChatContext from '../../context/chat/chatContext';

const ProfilePage = () => {
 const authContext = useContext(AuthContext);

 const profileContext = useContext(ProfileContext);

 const serverContext = useContext(ServerContext);

 const chatContext = useContext(ChatContext);

 const {
  profile,
  incomingRequests,
  sendFriendRequest,
  acceptFriendRequest,
  createDMChannel,
 } = profileContext;

 const { setCurrentChannel } = serverContext;

 const { setConnectTrue, connect } = chatContext;

 const { user } = authContext;

 useEffect(() => {
  authContext.loadUser();
  // eslint-disable-next-line
 }, []);

 const onSendFriendRequest = () => {
  sendFriendRequest();
  if (user) {
   createDMChannel(user);
  }
 };

 function OnFriendRequestAccept(request) {
  acceptFriendRequest(request);
 }

 function openDM(friend) {
  let connection = [user._id, friend._id];
  let members = [user.name, friend.name];
  let channelID = connection.sort();
  let channel = {
   name: members.toString(),
   _id: channelID.toString(),
   customization: {
    icon: friend.profilePicture,
   },
  };
  setCurrentChannel(channel);
  if (!connect) {
   setConnectTrue();
  }
 }

 if (!profile || !user) {
  return <div></div>;
 }

 if (profile._id === user._id) {
  return (
   <div
    className='profilebackground'
    style={{ backgroundImage: `url(${user.backgroundPicture})` }}
   >
    <div className='profilefilm'>
     <div className='profileMaster'>
      <div className='profileHeader'>
       <div
        className='profileImgDisplay'
        style={{ backgroundImage: `url(${profile.profilePicture})` }}
       ></div>
       <div>
        <h1>{profile.name}</h1>
        <h4>Brandon Location: United States </h4>
        <p>
         Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ex voluptatem
         voluptates
        </p>
       </div>
       <div></div>
       <div>
        <h3>Level: 150</h3>
        <h3>Years: 0</h3>
       </div>
       <div>
        <button className='globalbutton'>Edit</button>
        <button className='globalbutton'>Requests</button>
       </div>
      </div>

      <div className='profileSubMaster'>
       <div className='profilescreenshots'>
        <h2 className='center sticky'>Showcase</h2>
        <ul>
         {user.screenShots.map((screenShot, i) => (
          <li
           key={i}
           className='screenshot'
           style={{
            backgroundImage: `url(${screenShot})`,
           }}
          ></li>
         ))}
        </ul>
       </div>
       <div className='profileBody'>
        <div className='profiletabs'>
         <ul>
          <li>
           <h2>Online</h2>
          </li>
          <li>
           <h4>Friends</h4>
          </li>
          <li>
           <h4>Games</h4>
          </li>
          <li>
           <h4>Inventory</h4>
          </li>
          <li>
           <h4>ScreenShots</h4>
          </li>
          <li>
           <h4>Reviews</h4>
          </li>
          <li>
           <h4>Artwork</h4>
          </li>
          <li>
           <h4>Groups</h4>
          </li>
         </ul>
        </div>
        <div className='profilebodycenter'>
         <div className='friendrequests'>
          <ul>
           {incomingRequests.map((request, i) => (
            <li
             key={i}
             className='banner'
             style={{
              backgroundImage: `url(${request.profileBanner})`,
             }}
            >
             <h4>{request.name}</h4>
             <div
              className='serverimgsmall'
              style={{
               backgroundImage: `url(${request.profilePicture})`,
              }}
             ></div>
             <button
              className='globalbutton'
              onClick={() => OnFriendRequestAccept(request._id)}
             >
              Accept Request
             </button>
            </li>
           ))}
          </ul>
         </div>
        </div>
       </div>
      </div>
     </div>
    </div>
   </div>
  );
 } else {
  return (
   <div
    className='profilebackground'
    style={{ backgroundImage: `url(${profile.backgroundPicture})` }}
   >
    <div className='profilefilm'>
     <div className='profileMaster'>
      <div className='profileHeader'>
       <div
        className='profileImgDisplay'
        style={{ backgroundImage: `url(${profile.profilePicture})` }}
       ></div>
       <div>
        <h1>{profile.name}</h1>
        <h4>Brandon Location: United States </h4>
        <p>
         Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ex voluptatem
         voluptates
        </p>
       </div>
       <div></div>
       <div>
        <h3>Level: 150</h3>
        <h3>Years: 0</h3>
       </div>
       <div>
        <button className='globalbutton' onClick={onSendFriendRequest}>
         Add Friend
        </button>
        <Link to='redirectchat' onClick={() => openDM(profile)}>
         <button className='globalbutton'>Chat</button>
        </Link>
       </div>
      </div>

      <div className='profileSubMaster'>
       <div className='profilescreenshots'>
        <h2 className='center sticky'>Showcase</h2>
        {profile.screenShots ? (
         <ul>
          {profile.screenShots.map((screenShot, i) => (
           <li
            key={i}
            className='screenshot'
            style={{
             backgroundImage: `url(${screenShot})`,
            }}
           ></li>
          ))}
         </ul>
        ) : (
         <div></div>
        )}
       </div>
       <div className='profileBody'>
        <div className='profiletabs'>
         <ul>
          <li>
           <h2>Online</h2>
          </li>
          <li>
           <h4>Friends</h4>
          </li>
          <li>
           <h4>Games</h4>
          </li>
          <li>
           <h4>Inventory</h4>
          </li>
          <li>
           <h4>ScreenShots</h4>
          </li>
          <li>
           <h4>Achievements</h4>
          </li>
          <li>
           <h4>Reviews</h4>
          </li>
          <li>
           <h4>Artwork</h4>
          </li>
          <li>
           <h4>Groups</h4>
          </li>
         </ul>
        </div>
        <div className='profilebodycenter'></div>
       </div>
      </div>
     </div>
    </div>
   </div>
  );
 }
};

export default ProfilePage;

/*<div>
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
</div>;
*/
