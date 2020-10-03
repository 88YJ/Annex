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
       <div style={{ color: 'white' }}>
        <h1 className='profileheaderL' style={{ color: 'red' }}>
         {profile.name}
        </h1>
        <h4 className='profileheaderL' style={{ color: 'red' }}>
         Location: United States{' '}
        </h4>
        <p className='profileheaderL'>
         Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ex voluptatem
         voluptates
        </p>
       </div>
       <div></div>
       <div>
        <h3 className='profileheaderR'>Level: 150</h3>
        <h3 className='profileheaderR'>Years: 0</h3>
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
      <div className='profileSubMaster'>
       <div className='profilescreenshots'>
        <h2
         className='profileheaderC sticky'
         style={{ background: 'rgb(0,0,0,.8)' }}
        >
         Showcase
        </h2>
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
           <h2 className='profileheaderC'>Online</h2>
          </li>
          <li>
           <h4 className='profileheaderT'>Friends</h4>
          </li>
          <li>
           <h4 className='profileheaderT'>Games</h4>
          </li>
          <li>
           <h4 className='profileheaderT'>Inventory</h4>
          </li>
          <li>
           <h4 className='profileheaderT'>Achievements</h4>
          </li>
          <li>
           <h4 className='profileheaderT'>Screenshots</h4>
          </li>
          <li>
           <h4 className='profileheaderT'>Reviews</h4>
          </li>
          <li>
           <h4 className='profileheaderT'>Artwork</h4>
          </li>
          <li>
           <h4 className='profileheaderT'>Groups</h4>
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
       <div style={{ color: 'white' }}>
        <h1 className='profileheaderL' style={{ color: 'red' }}>
         {profile.name}
        </h1>
        <h4 className='profileheaderL' style={{ color: 'red' }}>
         Brandon Location: United States{' '}
        </h4>
        <p className='profileheaderL'>
         Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ex voluptatem
         voluptates
        </p>
       </div>
       <div></div>
       <div>
        <h3 className='profileheaderR'>Level: 150</h3>
        <h3 className='profileheaderR'>Years: 0</h3>
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

      <div className='profileSubMaster'>
       <div className='profilescreenshots'>
        <h2
         className='profileheaderC sticky'
         style={{ background: 'rgb(0,0,0,.8)' }}
        >
         Showcase
        </h2>
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
           <h4>Screenshots</h4>
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
        <div className='profilebodycenter'>
         <h1
          className='profileheaderC'
          style={{
           background: 'rgb(0,0,0,.8)',
           borderTop: '#384d48 1px solid',
           borderBottom: '#384d48 1px solid',
           marginTop: '1px',
           textAlign: 'center',
           height: '50',
          }}
         >
          Recent Activity
         </h1>
         <ul className='profilelist1'>
          <li
           style={{
            backgroundImage: `url('https://i.pinimg.com/originals/f6/5a/57/f65a578cbfe3a0526b80b8a21254a984.jpg')`,
           }}
          >
           <h2
            className='center'
            style={{ marginTop: '70px', backgroundColor: 'rgb(0,0,0,.9)' }}
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
            className='center'
            style={{ marginTop: '70px', backgroundColor: 'rgb(0,0,0,.9)' }}
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
            className='center'
            style={{ marginTop: '70px', backgroundColor: 'rgb(0,0,0,.9)' }}
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
            className='center'
            style={{ marginTop: '70px', backgroundColor: 'rgb(0,0,0,.9)' }}
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
            className='center'
            style={{ marginTop: '70px', backgroundColor: 'rgb(0,0,0,.9)' }}
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
            className='center'
            style={{ marginTop: '70px', backgroundColor: 'rgb(0,0,0,.9)' }}
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
            className='center'
            style={{ marginTop: '70px', backgroundColor: 'rgb(0,0,0,.9)' }}
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
            className='center'
            style={{ marginTop: '70px', backgroundColor: 'rgb(0,0,0,.9)' }}
           >
            Sweet Roll Master
           </h2>
          </li>
         </ul>
         <div className='profilecomments'>
          <h1
           className='profileheaderC'
           style={{
            background: 'rgb(0,0,0,.8)',
            borderTop: '#384d48 1px solid',
           }}
          >
           Profile Comments
          </h1>
          <ul>
           <li>
            <p className='profileheaderL' style={{ color: 'white' }}>
             Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur
             quidem quasi fuga laudantium ipsam ut earum laborum laboriosam,
             consectetur reiciendis odit voluptates? Velit voluptates, non sunt
             dicta animi repudiandae voluptatibus?
            </p>
            <h5 className='profileheaderL'>
             User: <span style={{ color: 'red' }}>BabyJesus</span>
            </h5>
           </li>
           <li>
            <p className='profileheaderL' style={{ color: 'white' }}>
             Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolores
             facere pariatur nemo culpa, itaque maxime nulla blanditiis
             reprehenderit eaque ratione! Culpa totam commodi iusto dicta
             maiores non consequuntur quod expedita?
            </p>
            <h5 className='profileheaderL'>
             User: <span style={{ color: 'red' }}>Rejis</span>
            </h5>
           </li>
           <li>
            <p className='profileheaderL' style={{ color: 'white' }}>
             Lorem ipsum dolor sit amet consectetur, adipisicing elit. Natus
             deserunt possimus veniam adipisci, quis quam rem ea vero, sunt nemo
             repudiandae provident officia assumenda voluptate? Doloremque non
             repellat adipisci vel?
            </p>
            <h5 className='profileheaderL'>
             User: <span style={{ color: 'red' }}>Parathax</span>
            </h5>
           </li>
           <li>
            <p className='profileheaderL' style={{ color: 'white' }}>
             Lorem ipsum, dolor sit amet consectetur adipisicing elit. Deleniti
             labore asperiores minima voluptas, exercitationem, itaque eveniet
             magni nisi natus, accusantium iste odit? Beatae eligendi eius
             ratione quo vitae dolores numquam.
            </p>
            <h5 className='profileheaderL'>
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
