import React from 'react';
import { Carousel } from '../../components/browser/Carousel';

export const Dashboard = () => {
  return (
    <div className='dashboard'>
      <h1 className='globalHeader' style={{ color: 'white' }}>
        Dashboard!
      </h1>
      <div className='dashboard-Grid'>
        <Carousel />
      </div>
    </div>
  );
};
