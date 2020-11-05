import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { useServerState, useServerDispatch, loadCurrentServer } from './context';
import { useSideBarDispatch, showChannellist, showUserlist } from '../../components/sidebar/context';

export const ServerLanding = () => {
  const { server_id } = useParams();
  const { joinedServersList, currentServer, loading } = useServerState();

  const serverDispatch = useServerDispatch();

  const sidebarDispatch = useSideBarDispatch();

  useEffect(() => {
    if (!loading) {
      let server = joinedServersList.filter((server) => server._id === server_id);
      loadCurrentServer(serverDispatch, server[0]);
    }
  }, [loading, serverDispatch, joinedServersList, server_id]);

  useEffect(() => {
    showChannellist(sidebarDispatch);
    showUserlist(sidebarDispatch);
  }, [sidebarDispatch]);

  if (currentServer) {
    return (
      <div className='server-Landingpageimg' style={{ backgroundImage: `url(${currentServer.img})` }}>
        <div>
          <h1 className='globalHeader' style={{ backgroundColor: 'rgb(0, 4, 17, 0.7)', color: 'red' }}>
            {currentServer.name}
          </h1>
        </div>
        <div>
          <div>
            <div>
              <h2 className='globalHeader' style={{ backgroundColor: 'rgb(0, 4, 17, 0.7)', color: 'red' }}>
                Welcome To the Server!!
              </h2>{' '}
              <br />{' '}
              <h2 className='globalHeader' style={{ backgroundColor: 'rgb(0, 4, 17, 0.7)', color: 'red' }}>
                Please take a look at our rules!
              </h2>
            </div>
          </div>
        </div>
        <div className='globalHeader'></div>
      </div>
    );
  }

  return <div>Loading...</div>;
};
