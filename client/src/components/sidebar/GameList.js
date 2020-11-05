import React from 'react';
import { Link } from 'react-router-dom';

import { useProfileState } from '../../pages/profile/context';

export const GameList = () => {
  const { ownedGames } = useProfileState();

  if (ownedGames) {
    return (
      <>
        <div className='R-Sidebar-Gamelist'>
          <h3 className='globalHeader' style={{ background: 'black', color: 'red' }}>
            Games:
          </h3>
          <div className='gamelist-Games'>
            <ul>
              {ownedGames.map((game, i) => (
                <li
                  key={i}
                  className='banner'
                  style={{
                    backgroundImage: `url(${game.banner})`,
                  }}
                >
                  <div className='banner-Film'>
                    <p style={{ fontSize: '16px', height: 20 }}>{game.name}</p>
                    <div className='games-Submenu'>
                      <ul>
                        <li>
                          <Link to='/game' className='globalbutton' /*onClick={() => openGame(game)}*/>
                            Game Page
                          </Link>
                        </li>
                        <li>
                          <button style={{ height: 'auto', width: 'auto' }} className='globalbutton'>
                            Play
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </>
    );
  } else {
    return null;
  }
};
