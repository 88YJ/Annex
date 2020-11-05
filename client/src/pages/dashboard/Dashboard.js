import React, { useEffect } from 'react';
import { Carousel } from '../../components/browser/Carousel';
import { CAROUSEL_DASHBOARD } from '../../components/browser/types/types';

import { useSideBarDispatch, showFriends, showGames } from '../../components/sidebar/context';

export const Dashboard = () => {
  const sidebarDispatch = useSideBarDispatch();

  useEffect(() => {
    showFriends(sidebarDispatch);
    showGames(sidebarDispatch);
  }, [sidebarDispatch]);

  return (
    <div className='dashboard'>
      <h1 className='globalHeader' style={{ color: 'white' }}>
        Dashboard!
      </h1>
      <div className='dashboard-Grid'>
        <Carousel type={CAROUSEL_DASHBOARD} />
      </div>
    </div>
  );
};
