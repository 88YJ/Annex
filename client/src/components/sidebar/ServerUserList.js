import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useServerState, useServerDispatch, loadServerUserList } from '../../pages/server/context';

export const ServerUserList = () => {
  const { currentServer, userList } = useServerState();
  const serverDispatch = useServerDispatch();

  useEffect(() => {
    if (currentServer) {
      loadServerUserList(serverDispatch, currentServer);
    }
  }, [currentServer, serverDispatch]);

  if (currentServer) {
    return (
      <>
        <div className='R-Sidebar-ServerUserlist'>
          <h3 className='globalHeader' style={{ background: 'black', color: 'red' }}>
            Users:
          </h3>
          <div className='R-Sidebar-ServerUsers'>
            <ul>
              {userList.map((user, i) =>
                user.onlineStatus ? (
                  <li key={i} className='banner' style={{ backgroundImage: `url(${user.profileBanner})` }}>
                    <div className='profilepicture' style={{ backgroundImage: `url('${user.profilePicture}')` }} />
                    <Link to={`/profile/${user._id}`}>
                      <p style={{ background: 'rgb(0,0,0,.5)' }}>{user.name}</p>
                    </Link>
                  </li>
                ) : null
              )}
              {userList.map((user, i) =>
                !user.onlineStatus ? (
                  <li key={i} className='banner offlineFriends' style={{ backgroundImage: `url(${user.profileBanner})` }}>
                    <div className='profilepicture' style={{ backgroundImage: `url('${user.profilePicture}')` }} />
                    <Link to={`/profile/${user._id}`}>
                      <p style={{ background: 'rgb(0,0,0,.5)' }}>{user.name}</p>
                    </Link>
                  </li>
                ) : null
              )}
            </ul>
          </div>
        </div>
      </>
    );
  }

  return <div>Loading...</div>;
};
