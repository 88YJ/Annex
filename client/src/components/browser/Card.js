import React from 'react';
import { useDashState } from '../../pages/dashboard/context';
import { SHOW_SCREENSHOTS, SHOW_GAMES, SHOW_STREAMS } from './types/types';
import { useProfileState } from '../../pages/profile/context';

export const Card = (props) => {
  const { type } = props;
  const { trendgames, trendstream } = useDashState();
  const { CurrentProfile } = useProfileState();

  switch (type) {
    case SHOW_SCREENSHOTS:
      return (
        <>
          {CurrentProfile.screenShots.map((item, index) => (
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
