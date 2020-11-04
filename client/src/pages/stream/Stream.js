import React, { useEffect } from 'react';
import { Component } from 'react';
import StreamSetup from './StreamSetup';

export const Stream = () => {
  useEffect(() => {
    document.getElementsByTagName('div')[3].setAttribute('class', 'app-mainGridStream');
  }, []);

  return (
    <div>
      <StreamSetup />
      <div
        style={{
          backgroundImage: `url('https://i.pinimg.com/originals/94/9a/89/949a8992f9829eedcb60b7f7c0b2faf6.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '150px',
          width: 'auto',
        }}
      >
        <h1 className='globalHeaderL' style={{ color: 'red' }}></h1>
        <h4 className='globalHeaderL' style={{ color: 'red' }}></h4>
      </div>
    </div>
  );
};
