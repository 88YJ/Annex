import React, { useContext, useEffect } from 'react';

import AuthContext from '../../context/auth/authContext';

const Game = () => {
 const authContext = useContext(AuthContext);

 useEffect(() => {
  authContext.loadUser();
  // eslint-disable-next-line
 }, []);

 return <div>Game</div>;
};

export default Game;
