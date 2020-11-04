import React from 'react';
import { Card } from './Card';
import Arrow from '../../images/Arrow.png';
import { SHOW_GAMES, SHOW_STREAMS } from './types/types';

export const Carousel = () => {
  var streamRef = React.createRef();
  var gamesRef = React.createRef();

  function nextClick(reference) {
    let slide;

    if (reference === 'stream') {
      slide = streamRef.current;
    } else if (reference === 'game') {
      slide = gamesRef.current;
    }

    slide.scrollLeft += slide.offsetWidth;
    if (slide.scrollLeft >= slide.scrollWidth - slide.offsetWidth) {
      slide.scrollLeft = 0;
    }
  }
  function prevClick(reference) {
    let slide;

    if (reference === 'stream') {
      slide = streamRef.current;
    } else if (reference === 'game') {
      slide = gamesRef.current;
    }

    slide.scrollLeft -= slide.offsetWidth;
    if (slide.scrollLeft <= 0) {
      slide.scrollLeft = slide.scrollWidth;
    }
  }

  return (
    <>
      <div className='dashboard-Trending'>
        <h2 className='sticky globalHeader' style={{ color: 'red' }}>
          Trending Streams For You!
        </h2>
        <div className='wrapper'>
          <div className='trendy' ref={streamRef}>
            <Card type={SHOW_STREAMS} />
          </div>
          <div className='row'>
            <div className='prev' onClick={() => prevClick('stream')}>
              <img src={Arrow} alt='' />
            </div>
            <div className='next' onClick={() => nextClick('stream')}>
              <img src={Arrow} alt='' />
            </div>
          </div>
        </div>
      </div>
      <div className='dashboard-Trending'>
        <h2 className='sticky globalHeader' style={{ color: 'red' }}>
          Trending Games For You!
        </h2>
        <div className='wrapper'>
          <div className='trendy' ref={gamesRef}>
            <Card type={SHOW_GAMES} />
          </div>
          <div className='row'>
            <div className='prev' onClick={() => prevClick('game')}>
              <img src={Arrow} alt='' />
            </div>
            <div className='next' onClick={() => nextClick('game')}>
              <img src={Arrow} alt='' />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
