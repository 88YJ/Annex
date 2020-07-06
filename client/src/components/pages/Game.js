import React, { useContext, useEffect } from 'react';
import ProfileContext from '../../context/profile/profileContext';
import AuthContext from '../../context/auth/authContext';
import GameContext from '../../context/games/gameContext';
import { Link } from 'react-router-dom';

const Game = () => {
 const authContext = useContext(AuthContext);

 const gameContext = useContext(GameContext);

 const profileContext = useContext(ProfileContext);

 const { friendList } = profileContext;

 const { myGame } = gameContext;

 useEffect(() => {
  authContext.loadUser();
  // eslint-disable-next-line
 }, []);

 function download() {}

 if (myGame) {
  return (
   <div className='myGamepage'>
    <div className='myGameBanner'>
     <div></div>
     <div
      className='myGameimg'
      style={{ backgroundImage: `url(${myGame.banner})` }}
     ></div>
     <div></div>
    </div>
    <div className='myGameHeader'>
     <h1 className='center' style={{ background: 'black', color: 'red' }}>
      {myGame.name}
     </h1>
     <button onClick={download} className='globalbutton'>
      Download
     </button>
     <button onClick={download} className='globalbutton'>
      Open Store Page
     </button>
     <button onClick={download} className='globalbutton'>
      Forum
     </button>
     <button onClick={download} className='globalbutton'>
      Support
     </button>
    </div>
    <div className='myGameBody'>
     <div className='myGamelists'>
      <ul>
       <li>
        <h3>Friends to play with:</h3>
       </li>
       {friendList.map((friend, i) => (
        <li
         key={i}
         className='banner'
         style={{ backgroundImage: `url(${friend.profileBanner})` }}
        >
         <div
          className='profilepicture'
          style={{ backgroundImage: `url(${friend.profilePicture})` }}
         ></div>
         <Link to='#'>{friend.name}</Link>
        </li>
       ))}
      </ul>
     </div>
     <div></div>
    </div>
   </div>
  );
 } else {
  return <div></div>;
 }
};

export default Game;
