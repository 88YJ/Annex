import React from 'react';
import StreamSetup from './StreamSetup'

const Stream = () => {
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
     <h1 className='globalHeaderL' style={{ color: 'red' }}>
     </h1>
     <h4 className='globalHeaderL' style={{ color: 'red' }}>
     </h4>
    </div>
  </div>
 );
};

export default Stream;
