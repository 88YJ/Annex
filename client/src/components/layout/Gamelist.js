import React, { useContext, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import GameContext from '../../context/games/gameContext';

import AuthContext from '../../context/auth/authContext';

const Gamelist = () => {
 const authContext = useContext(AuthContext);

 const gameContext = useContext(GameContext);

 const { games, getGames } = gameContext;

 useEffect(() => {
  authContext.loadUser();
  getGames();
  // eslint-disable-next-line
 }, []);

 if (games == null) {
  return (
   <Fragment>
    <div className='gamelist'>
     <h3>Games:</h3>
    </div>
   </Fragment>
  );
 } else {
  return (
   <Fragment>
    <div className='gamelist'>
     <h3>Games:</h3>
     <div className='games'>
      <ul>
       {games.map((game) => (
        <li key={game._id}>
         <Link to='/'>{game.name}</Link>
        </li>
       ))}
      </ul>
     </div>
    </div>
   </Fragment>
  );
 }
};

export default Gamelist;
