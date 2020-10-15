import React, { useContext, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import GameContext from '../../context/games/gameContext';
import ServerContext from '../../context/server/serverContext';
import StoreContext from '../../context/store/storeContext';
import ProfileContext from '../../context/profile/profileContext';

import AuthContext from '../../context/auth/authContext';

const RightSidebar = () => {
 const authContext = useContext(AuthContext);

 const gameContext = useContext(GameContext);

 const storeContext = useContext(StoreContext);

 const serverContext = useContext(ServerContext);

 const profileContext = useContext(ProfileContext);

 const { isAuthenticated } = authContext;

 const { serverSidebar, serverUserList } = serverContext;

 const { games, gamesSidebar, setMyGame } = gameContext;

 const { gamescart, cartSidebar } = storeContext;

 const { getIdProfile } = profileContext;

 useEffect(() => {
  authContext.loadUser();
  // eslint-disable-next-line
 }, []);

 function openProfile(user) {
  getIdProfile(user);
 }
 function openGame(game) {
  setMyGame(game);
 }

 if (serverSidebar && isAuthenticated) {
  return (
   <Fragment>
    <div className='R-Sidebar-ServerUserlist'>
     <h3 className='globalHeader' style={{ background: 'black', color: 'red' }}>
      Users:
     </h3>
     <div className='R-Sidebar-ServerUsers'>
      <ul>
       {serverUserList.map((user, i) => (
        <li
         key={i}
         className='banner'
         style={{
          backgroundImage: `url(${user.profileBanner})`,
         }}
        >
         <div
          className='profilepicture'
          style={{ backgroundImage: `url('${user.profilePicture}')` }}
         ></div>
         <Link to='/profilepage' onClick={() => openProfile(user)}>
          <p style={{ background: 'rgb(0,0,0,.5)' }}>{user.name}</p>
         </Link>
        </li>
       ))}
      </ul>
     </div>
    </div>
   </Fragment>
  );
 } else if (cartSidebar && isAuthenticated) {
  return (
   <Fragment>
    <div className='R-Sidebar-Cartlist'>
     <h3 className='globalHeader' style={{ background: 'black', color: 'red' }}>
      Cart:
     </h3>
     <div className='cartlist-Items'>
      <ul>
       {gamescart !== null ? (
        gamescart.map((cart, i) => (
         <li key={i}>
          <Link to='/'>{cart.name}</Link>
         </li>
        ))
       ) : (
        <li />
       )}
      </ul>
      {gamescart !== null ? (
       <Link
        style={{ height: 'auto', width: 'auto' }}
        className='globalbutton'
        to='/cart'
       >
        Go To Cart
       </Link>
      ) : (
       <div />
      )}
     </div>
    </div>
   </Fragment>
  );
 } else if (gamesSidebar && isAuthenticated) {
  if (games == null) {
   return (
    <Fragment>
     <div className='R-Sidebar-Gamelist'>
      <h3 className='globalHeader' style={{ background: 'black' }}>
       Games:
      </h3>
     </div>
    </Fragment>
   );
  } else {
   return (
    <Fragment>
     <div className='R-Sidebar-Gamelist'>
      <h3
       className='globalHeader'
       style={{ background: 'black', color: 'red' }}
      >
       Games:
      </h3>
      <div className='gamelist-Games'>
       <ul>
        {games.map((game, i) => (
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
              <Link
               to='/game'
               className='globalbutton'
               onClick={() => openGame(game)}
              >
               Game Page
              </Link>
             </li>
             <li>
              <button
               style={{ height: 'auto', width: 'auto' }}
               className='globalbutton'
              >
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
    </Fragment>
   );
  }
 } else if (isAuthenticated) {
  return (
   <Fragment>
    <div className='R-Sidebar-Gamelist'>
     <h3 style={{ background: 'black' }}>Error:</h3>
    </div>
   </Fragment>
  );
 } else {
  return <div className='R-Sidebar-Gamelist'></div>;
 }
};

export default RightSidebar;
