import React from 'react';
import { Link } from 'react-router-dom';
import { useProfileState } from '../../pages/profile/context';

export const OwnedGames = () => {
  const { ownedGames } = useProfileState();

  return (
    <>
      <div className='dashboard-Games'>
        <h2 className='sticky globalHeader' style={{ color: 'red' }}>
          My Games
        </h2>
        <ul>
          {ownedGames.map((game) => (
            <li key={game._id}>
              <Link to={`/game/${game._id}`}>
                <div className='dashboard-GamesImg' style={{ backgroundImage: `url(${game.img})` }}>
                  <div className='dashboard-Game-Submenu'>
                    <h3>{game.name}</h3>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};