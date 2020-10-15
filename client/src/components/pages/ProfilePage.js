import React, { useContext, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import ProfileContext from '../../context/profile/profileContext';
import ServerContext from '../../context/server/serverContext';
import ChatContext from '../../context/chat/chatContext';
import ModalContext from '../../context/modal/modalContext';

const ProfilePage = () => {
 const authContext = useContext(AuthContext);

 const profileContext = useContext(ProfileContext);

 const serverContext = useContext(ServerContext);

 const chatContext = useContext(ChatContext);

 const modalContext = useContext(ModalContext);

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

 const { showModalWithEditProfile } = modalContext;

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

 function editProfile() {
  showModalWithEditProfile();
 }

 function openDM(friend) {
  let connection = [user._id, friend._id];
  let members = [user.name, friend.name];
  let channelID = connection.sort();
  let channel = {
   name: members.toString(),
   _id: channelID.toString(),
   customization: {
    icon: friend.backgroundPicture,
   },
  };
  setCurrentChannel(channel);
  if (!connect) {
   setConnectTrue();
  }
 }

 if (!user || !profile) {
  return <Redirect to='/' />;
 } else if (profile._id === user._id) {
  return (
   <div
    className='profile-Background'
    style={{ backgroundImage: `url(${user.backgroundPicture})` }}
   >
    <div className='profile-Film'>
     <div className='profile-Master'>
      <div className='profile-Header'>
       <div
        className='profile-DisplayPicture'
        style={{ backgroundImage: `url(${profile.profilePicture})` }}
       ></div>
       <div style={{ color: 'white' }}>
        <h1 className='globalHeaderL' style={{ color: 'red' }}>
         {profile.name}
        </h1>
        <h4 className='globalHeaderL' style={{ color: 'red' }}>
         Location: United States{' '}
        </h4>
        <p className='globalHeaderL'>
         Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ex voluptatem
         voluptates
        </p>
       </div>
       <div></div>
       <div>
        <h3 className='globalHeaderR' style={{ color: 'red' }}>
         Level: 150
        </h3>
        <h3 className='globalHeaderR' style={{ color: 'red' }}>
         Years: 0
        </h3>
       </div>
       <div>
        <button
         className='globalbutton'
         style={{ height: 'auto', width: 'auto' }}
         onClick={() => editProfile()}
        >
         Edit
        </button>
        <button
         className='globalbutton'
         style={{ height: 'auto', width: 'auto' }}
        >
         Requests
        </button>
       </div>
      </div>
      <div className='profile-SubMaster'>
       <div className='profile-Screenshots-Container'>
        <h2
         className='globalHeader sticky'
         style={{ background: 'rgb(0,0,0,.8)', color: 'red' }}
        >
         Showcase
        </h2>
        <ul>
         {user.screenShots.map((screenShot, i) => (
          <li
           key={i}
           className='profile-Screenshots'
           style={{
            backgroundImage: `url(${screenShot})`,
           }}
          ></li>
         ))}
        </ul>
       </div>
       <div className='profile-Body'>
        <div className='profile-Tabs'>
         <ul>
          <li>
           <h2 className='globalHeader'>Online</h2>
          </li>
          <li>
           <h4 className='globalHeader'>Friends</h4>
          </li>
          <li>
           <h4 className='globalHeader'>Games</h4>
          </li>
          <li>
           <h4 className='globalHeader'>Inventory</h4>
          </li>
          <li>
           <h4 className='globalHeader'>Achievements</h4>
          </li>
          <li>
           <h4 className='globalHeader'>Screenshots</h4>
          </li>
          <li>
           <h4 className='globalHeader'>Reviews</h4>
          </li>
          <li>
           <h4 className='globalHeader'>Artwork</h4>
          </li>
          <li>
           <h4 className='globalHeader'>Groups</h4>
          </li>
         </ul>
        </div>
        <div className='profile-Body-Center'>
         <div className='profile-Friendrequests'>
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
              className='profilepicture'
              style={{
               backgroundImage: `url(${request.profilePicture})`,
              }}
             ></div>
             <button
              style={{ height: 'auto', width: 'auto' }}
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
    className='profile-Background'
    style={{ backgroundImage: `url(${profile.backgroundPicture})` }}
   >
    <div className='profile-Film'>
     <div className='profile-Master'>
      <div className='profile-Header'>
       <div
        className='profile-DisplayPicture'
        style={{ backgroundImage: `url(${profile.profilePicture})` }}
       ></div>
       <div style={{ color: 'white' }}>
        <h1 className='globalHeaderL' style={{ color: 'red' }}>
         {profile.name}
        </h1>
        <h4 className='globalHeaderL' style={{ color: 'red' }}>
         Brandon Location: United States{' '}
        </h4>
        <p className='globalHeaderL'>
         Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ex voluptatem
         voluptates
        </p>
       </div>
       <div></div>
       <div>
        <h3 className='globalHeaderR' style={{ color: 'red' }}>
         Level: 150
        </h3>
        <h3 className='globalHeaderR' style={{ color: 'red' }}>
         Years: 0
        </h3>
       </div>
       <div>
        <button
         style={{ height: 'auto', width: 'auto' }}
         className='globalbutton'
         onClick={onSendFriendRequest}
        >
         Add Friend
        </button>
        <Link to='redirectchat' onClick={() => openDM(profile)}>
         <button
          style={{ height: 'auto', width: 'auto' }}
          className='globalbutton'
         >
          Chat
         </button>
        </Link>
       </div>
      </div>

      <div className='profile-SubMaster'>
       <div className='profile-Screenshots-Container'>
        <h2
         className='globalHeader sticky'
         style={{ background: 'rgb(0,0,0,.8)', color: 'red' }}
        >
         Showcase
        </h2>
        {profile.screenShots ? (
         <ul>
          {profile.screenShots.map((screenShot, i) => (
           <li
            key={i}
            className='profile-Screenshots'
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
       <div className='profile-Body'>
        <div className='profile-Tabs'>
         <ul>
          <li>
           <h2 className='globalHeader sticky'>Online</h2>
          </li>
          <li>
           <h4 className='globalHeader sticky'>Friends</h4>
          </li>
          <li>
           <h4 className='globalHeader sticky'>Games</h4>
          </li>
          <li>
           <h4 className='globalHeader sticky'>Inventory</h4>
          </li>
          <li>
           <h4 className='globalHeader sticky'>Screenshots</h4>
          </li>
          <li>
           <h4 className='globalHeader sticky'>Achievements</h4>
          </li>
          <li>
           <h4 className='globalHeader sticky'>Reviews</h4>
          </li>
          <li>
           <h4 className='globalHeader sticky'>Artwork</h4>
          </li>
          <li>
           <h4 className='globalHeader sticky'>Groups</h4>
          </li>
         </ul>
        </div>
        <div className='profile-Body-Center'>
         <h1
          className='globalHeader'
          style={{
           background: 'rgb(0,0,0,.8)',
           borderTop: '#384d48 1px solid',
           borderBottom: '#384d48 1px solid',
           marginTop: '1px',
           textAlign: 'center',
           height: '50',
           color: 'red',
          }}
         >
          Recent Activity
         </h1>
         <ul className='profile-Achievementslist'>
          <li
           style={{
            backgroundImage: `url('https://i.pinimg.com/originals/f6/5a/57/f65a578cbfe3a0526b80b8a21254a984.jpg')`,
           }}
          >
           <h2
            className='globalHeader'
            style={{
             marginTop: '70px',
             backgroundColor: 'rgb(0,0,0,.9)',
             color: 'red',
            }}
           >
            Legendary
           </h2>
          </li>
          <li
           style={{
            backgroundImage: `url('https://i.pinimg.com/originals/f6/5a/57/f65a578cbfe3a0526b80b8a21254a984.jpg')`,
           }}
          >
           <h2
            className='globalHeader'
            style={{
             marginTop: '70px',
             backgroundColor: 'rgb(0,0,0,.9)',
             color: 'red',
            }}
           >
            Head Hunter
           </h2>
          </li>
          <li
           style={{
            backgroundImage: `url('https://cdn.survivetheark.com/uploads/monthly_2017_07/ark.jpg.eb6143cfedcd05eda8126deef02b7385.jpg')`,
           }}
          >
           <h2
            className='globalHeader'
            style={{
             marginTop: '70px',
             backgroundColor: 'rgb(0,0,0,.9)',
             color: 'red',
            }}
           >
            Rex Master
           </h2>
          </li>
          <li
           style={{
            backgroundImage: `url('https://i.redd.it/vjw22nfxlns11.jpg')`,
           }}
          >
           <h2
            className='globalHeader'
            style={{
             marginTop: '70px',
             backgroundColor: 'rgb(0,0,0,.9)',
             color: 'red',
            }}
           >
            Portal Jumper
           </h2>
          </li>
          <li
           style={{
            backgroundImage: `url('https://steam.cryotank.net/wp-content/gallery/monsterhunterworld/Monster-Hunter-World-01-HD.png')`,
           }}
          >
           <h2
            className='globalHeader'
            style={{
             marginTop: '70px',
             backgroundColor: 'rgb(0,0,0,.9)',
             color: 'red',
            }}
           >
            Monster Slayer
           </h2>
          </li>
          <li
           style={{
            backgroundImage: `url('https://savegameonline.com/wp-content/uploads/2013/02/witcher-3-banner-1.png')`,
           }}
          >
           <h2
            className='globalHeader'
            style={{
             marginTop: '70px',
             backgroundColor: 'rgb(0,0,0,.9)',
             color: 'red',
            }}
           >
            Brewer
           </h2>
          </li>
          <li
           style={{
            backgroundImage: `url('https://www.f-covers.com/cover/another-skyrim-facebook-cover-timeline-banner-for-fb.jpg')`,
           }}
          >
           <h2
            className='globalHeader'
            style={{
             marginTop: '70px',
             backgroundColor: 'rgb(0,0,0,.9)',
             color: 'red',
            }}
           >
            World Eater Down
           </h2>
          </li>
          <li
           style={{
            backgroundImage: `url('https://www.f-covers.com/cover/another-skyrim-facebook-cover-timeline-banner-for-fb.jpg')`,
           }}
          >
           <h2
            className='globalHeader'
            style={{
             marginTop: '70px',
             backgroundColor: 'rgb(0,0,0,.9)',
             color: 'red',
            }}
           >
            Sweet Roll Master
           </h2>
          </li>
         </ul>
         <div className='profile-Comments'>
          <h1
           className='globalHeader'
           style={{
            background: 'rgb(0,0,0,.8)',
            borderTop: '#384d48 1px solid',
            color: 'red',
           }}
          >
           Profile Comments
          </h1>
          <ul>
           <li>
            <p className='globalHeaderL' style={{ color: 'white' }}>
             Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur
             quidem quasi fuga laudantium ipsam ut earum laborum laboriosam,
             consectetur reiciendis odit voluptates? Velit voluptates, non sunt
             dicta animi repudiandae voluptatibus?
            </p>
            <h5 className='globalHeaderL' style={{ color: 'grey' }}>
             User: <span style={{ color: 'red' }}>BabyJesus</span>
            </h5>
           </li>
           <li>
            <p className='globalHeaderL' style={{ color: 'white' }}>
             Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolores
             facere pariatur nemo culpa, itaque maxime nulla blanditiis
             reprehenderit eaque ratione! Culpa totam commodi iusto dicta
             maiores non consequuntur quod expedita?
            </p>
            <h5 className='globalHeaderL' style={{ color: 'grey' }}>
             User: <span style={{ color: 'red' }}>Rejis</span>
            </h5>
           </li>
           <li>
            <p className='globalHeaderL' style={{ color: 'white' }}>
             Lorem ipsum dolor sit amet consectetur, adipisicing elit. Natus
             deserunt possimus veniam adipisci, quis quam rem ea vero, sunt nemo
             repudiandae provident officia assumenda voluptate? Doloremque non
             repellat adipisci vel?
            </p>
            <h5 className='globalHeaderL' style={{ color: 'grey' }}>
             User: <span style={{ color: 'red' }}>Parathax</span>
            </h5>
           </li>
           <li>
            <p className='globalHeaderL' style={{ color: 'white' }}>
             Lorem ipsum, dolor sit amet consectetur adipisicing elit. Deleniti
             labore asperiores minima voluptas, exercitationem, itaque eveniet
             magni nisi natus, accusantium iste odit? Beatae eligendi eius
             ratione quo vitae dolores numquam.
            </p>
            <h5 className='globalHeaderL' style={{ color: 'grey' }}>
             User: <span style={{ color: 'red' }}>Flipster</span>
            </h5>
           </li>
          </ul>
         </div>
        </div>
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
