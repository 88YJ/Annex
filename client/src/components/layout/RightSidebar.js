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
    <div className='serveruserlist'>
     <h3 style={{ background: 'black' }}>Users:</h3>
     <div className='serverusers'>
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
    <div className='cartlist'>
     <h3 style={{ background: 'black' }}>Cart:</h3>
     <div className='cart'>
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
      <br />
      {gamescart !== null ? (
       <Link className='gotocart' to='/cart'>
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
     <div className='gamelist'>
      <h3 style={{ background: 'black' }}>Games:</h3>
     </div>
    </Fragment>
   );
  } else {
   return (
    <Fragment>
     <div className='gamelist'>
      <h3 style={{ background: 'black' }}>Games:</h3>
      <div className='games'>
       <ul>
        {games.map((game, i) => (
         <li
          key={i}
          className='banner'
          style={{
           backgroundImage: `url(${game.banner})`,
          }}
         >
          <div className='bannerfilm'>
           <p style={{ fontSize: '16px' }}>{game.name}</p>
           <div className='gamesubmenu'>
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
              <button className='globalbutton'>Play</button>
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
    <div className='gamelist'>
     <h3 style={{ background: 'black' }}>Error:</h3>
    </div>
   </Fragment>
  );
 } else {
  return <div className='gamelist'></div>;
 }
};

export default RightSidebar;
