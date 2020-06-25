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

 // <div>
 //  <div className='gamelist'>
 //   <h3>Games:</h3>
 //   <div className='games'>
 //    <ul>
 //     <li>
 //      <Link to='/game'>Skyrim</Link>
 //     </li>
 //     <li>
 //      <Link to='/game'>Archeage</Link>
 //     </li>
 //     <li>
 //      <Link to='/game'>ARK:Survival Evolved</Link>
 //     </li>
 //     <li>
 //      <Link to='/game'>7 Days to Die</Link>
 //     </li>
 //     <li>
 //      <Link to='/game'>Assassins Creed IV Black Flag</Link>
 //     </li>
 //    </ul>
 //   </div>
 //  </div>
 // </div>
};

export default Gamelist;
