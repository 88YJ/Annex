import React from 'react';
import { useDashState } from '../../pages/dashboard/context';

export const Card = (props) => {
  const { trendgames, trendstream } = useDashState();

  let data = [];

  const { type } = props;
  if (type === 'screenshots') {
    return (
      <>
        import {useDashState} from './context';
        {data.map((item, index) => (
          <div className='card' key={index}>
            <img src={item} alt=''></img>
          </div>
        ))}
      </>
    );
  } else if (type === 'streams') {
    return (
      <>
        {trendstream.map((item, index) => (
          <div className='card' key={index}>
            <img src={item.img} alt=''></img>
            <h2 className='globalheader'>{item.name}</h2>
          </div>
        ))}
      </>
    );
  } else if (type === 'games') {
    return (
      <>
        {trendgames.map((item, index) => (
          <div className='card' key={index}>
            <img src={item.img} alt=''></img>
            <h2 className='globalheader'>{item.name}</h2>
          </div>
        ))}
      </>
    );
  }
};
