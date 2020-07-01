import React, { useContext, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import GameContext from '../../context/games/gameContext';
import ServerContext from '../../context/server/serverContext';

import AuthContext from '../../context/auth/authContext';

const RightSidebar = () => {
 const authContext = useContext(AuthContext);

 const gameContext = useContext(GameContext);

 const serverContext = useContext(ServerContext);

 const { serverSidebar, serverUserList } = serverContext;

 const { games, gamesSidebar } = gameContext;

 useEffect(() => {
  authContext.loadUser();
  // eslint-disable-next-line
 }, []);

 if (serverSidebar) {
  return (
   <Fragment>
    <div className='gamelist'>
     <h3>Users:</h3>
     <div className='games'>
      <ul>
       {serverUserList.map((user, i) => (
        <li key={i}>
         <Link to='/'>{user.name}</Link>
        </li>
       ))}
      </ul>
     </div>
    </div>
   </Fragment>
  );
 } else if (gamesSidebar) {
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
        {games.map((game, i) => (
         <li key={i}>
          <Link to='/'>{game.name}</Link>
         </li>
        ))}
       </ul>
      </div>
     </div>
    </Fragment>
   );
  }
 } else {
  return (
   <Fragment>
    <div className='gamelist'>
     <h3>Error:</h3>
    </div>
   </Fragment>
  );
 }
};

export default RightSidebar;
