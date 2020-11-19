import React from 'react';
import { Link } from 'react-router-dom';

import { useProfileState } from '../../pages/profile/context';

export const FriendList = () => {
  const { Friends } = useProfileState();

  return (
    <>
      <div className='L-Sidebar-Friendlist'>
        <h3 className='globalHeader' style={{ background: 'black' }}>
          Friends:
        </h3>
        <div className='Friendlist-Friends'>
          <ul>
            {Friends.map((friend, i) =>
              friend.onlineStatus ? (
                <li key={i} className='banner' style={{ backgroundImage: `url(${friend.profileBanner})` }}>
                  <div className='profilepicture' style={{ backgroundImage: `url('${friend.profilePicture}')`, marginLeft: '3px' }} />
                  <Link to='#'>
                    <p style={{ background: 'rgb(0,0,0,.5)' }}>{friend.name}</p>
                  </Link>
                  <div className='Friendlist-Submenu'>
                    <ul>
                      <li>
                        <Link to={`/directchat/${friend._id}`}>Message</Link>
                      </li>
                      <li>
                        <Link to={`/profile/${friend._id}`}>Profile</Link>
                      </li>
                    </ul>
                  </div>
                </li>
              ) : null
            )}
            {Friends.map((friend, i) =>
              friend.onlineStatus === false ? (
                <li key={i} className='banner offlineFriends' style={{ backgroundImage: `url(${friend.profileBanner})` }}>
                  <div className='profilepicture' style={{ backgroundImage: `url('${friend.profilePicture}')`, marginLeft: '3px' }} />
                  <Link to='#'>
                    <p style={{ background: 'rgb(0,0,0,.5)' }}>{friend.name}</p>
                  </Link>
                  <div className='Friendlist-Submenu'>
                    <ul>
                      <li>
                        <Link to={`/directchat/${friend._id}`}>Message</Link>
                      </li>
                      <li>
                        <Link to={`/profile/${friend._id}`}>Profile</Link>
                      </li>
                    </ul>
                  </div>
                </li>
              ) : null
            )}
          </ul>
        </div>
      </div>
    </>
  );
};
