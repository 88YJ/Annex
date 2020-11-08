import React from 'react';
import { Carousel } from './Carousel';
import { CAROUSEL_SCREENSHOT } from './types/types';
import { useProfileState } from '../../pages/profile/context';
import { useAuthState } from '../../pages/authentication/context';
import DefaultBackground from '../../images/DefaultBackground.png';

export const Profile = () => {
  let backgroundImage = DefaultBackground;
  const { CurrentProfile } = useProfileState();
  const { user } = useAuthState();

  if (CurrentProfile && CurrentProfile.backgroundPicture) {
    backgroundImage = CurrentProfile.backgroundPicture;
  }

  if (user._id === CurrentProfile._id) {
    return (
      <>
        <div className='profile-Background' style={{ backgroundImage: `url(${backgroundImage})` }}>
          <div className='profile-Film'>
            <div className='profile-Master'>
              <div className='profile-Header'>
                <div className='profile-DisplayPicture' style={{ backgroundImage: `url(${CurrentProfile.profilePicture})` }}></div>
                <div style={{ color: 'white' }}>
                  <h1 className='globalHeaderL' style={{ color: 'red' }}>
                    {CurrentProfile.name}
                  </h1>
                  <h4 className='globalHeaderL' style={{ color: 'red' }}>
                    Location: United States{' '}
                  </h4>
                  <p className='globalHeaderL'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ex voluptatem voluptates</p>
                </div>
                <div />
                <div>
                  <h3 className='globalHeaderR' style={{ color: 'red' }}>
                    Level: 150
                  </h3>
                  <h3 className='globalHeaderR' style={{ color: 'red' }}>
                    Years: 0
                  </h3>
                </div>
                <div>
                  <button className='globalbutton' style={{ height: 'auto', width: 'auto' }} /*onClick={() => editProfile()}*/>
                    Edit
                  </button>
                  <button className='globalbutton' style={{ height: 'auto', width: 'auto' }}>
                    Requests
                  </button>
                </div>
              </div>
              <div className='profile-SubMaster'>
                <Carousel type={CAROUSEL_SCREENSHOT} />
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
                    <ul>
                      {user.incomingFriendRequests.map((request, i) => (
                        <li
                          key={i}
                          className='banner'
                          style={{
                            backgroundImage: `url(${request.profileBanner})`,
                          }}
                        >
                          <h4>{request.name}</h4>
                          <div className='profilepicture' style={{ backgroundImage: `url(${request.profilePicture})` }} />
                          <button style={{ height: 'auto', width: 'auto' }} className='globalbutton' /*onClick={() => OnFriendRequestAccept(request._id)}*/>
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
      </>
    );
  } else {
    return (
      <div className='profile-Background' style={{ backgroundImage: `url(${backgroundImage})` }}>
        <div className='profile-Film'>
          <div className='profile-Master'>
            <div className='profile-Header'>
              <div className='profile-DisplayPicture' style={{ backgroundImage: `url(${CurrentProfile.profilePicture})` }}></div>
              <div style={{ color: 'white' }}>
                <h1 className='globalHeaderL' style={{ color: 'red' }}>
                  {CurrentProfile.name}
                </h1>
                <h4 className='globalHeaderL' style={{ color: 'red' }}>
                  Location: United States{' '}
                </h4>
                <p className='globalHeaderL'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ex voluptatem voluptates</p>
              </div>
              <div />
              <div>
                <h3 className='globalHeaderR' style={{ color: 'red' }}>
                  Level: 150
                </h3>
                <h3 className='globalHeaderR' style={{ color: 'red' }}>
                  Years: 0
                </h3>
                {CurrentProfile.onlineStatus ? (
                  <h3 className='globalHeaderR' style={{ color: 'red' }}>
                    Online
                  </h3>
                ) : (
                  <h3 className='globalHeaderR' style={{ color: 'red' }}>
                    Offline
                  </h3>
                )}
              </div>
              <div>
                <button className='globalbutton' style={{ height: 'auto', width: 'auto' }} /*onClick={() => editProfile()}*/>
                  Add
                </button>
                <button className='globalbutton' style={{ height: 'auto', width: 'auto' }}>
                  Chat
                </button>
              </div>
            </div>
            <div className='profile-SubMaster'>
              <Carousel type={CAROUSEL_SCREENSHOT} />
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
                <div className='profile-Body-Center'></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};
