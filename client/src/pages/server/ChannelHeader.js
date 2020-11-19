import React from 'react';
import { useServerState } from './context';

export const ChannelHeader = () => {
  const { currentTextChannel } = useServerState();
  return (
    <>
      <div className='chatHeader'>
        <div className='chatHeader_left'>
          <h3 style={{ height: 'auto' }}>
            <span className='chatHeader_hash'>#</span>
            {currentTextChannel.name}
          </h3>
        </div>

        <div className='chatHeader_right'></div>
      </div>
    </>
  );
};
