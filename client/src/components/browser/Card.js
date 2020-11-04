import React from 'react';
import { useDashState } from '../../pages/dashboard/context';
import { SHOW_SCREENSHOTS, SHOW_GAMES, SHOW_STREAMS } from './types/types';

export const Card = (props) => {
  const { trendgames, trendstream } = useDashState();

  let data = [];

  const { type } = props;

  switch (type) {
    case SHOW_SCREENSHOTS:
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
    case SHOW_STREAMS:
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
    case SHOW_GAMES:
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
    default:
      return null;
  }
};
