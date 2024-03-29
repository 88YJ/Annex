import React, { useContext, useEffect } from 'react';
import ProfileContext from '../../context/profile/profileContext';
import AuthContext from '../../context/auth/authContext';
import GameContext from '../../context/games/gameContext';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';

let red = false;

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
 if (!authContext.user) {
  return <Redirect to='/' />;
 } else if (myGame) {
  return (
   <div className='Gamepage'>
    <div className='Gamepage-Banner'>
     <div></div>
     <div
      className='Gamepage-Img'
      style={{ backgroundImage: `url(${myGame.banner})` }}
     ></div>
     <div></div>
    </div>
    <div className='Gamepage-Nav'>
     <h1 className='globalHeader' style={{ background: 'black', color: 'red' }}>
      {myGame.name}
     </h1>
     <button
      style={{ height: 'auto', width: 'auto' }}
      onClick={download}
      className='globalbutton'
     >
      Download
     </button>
     <button
      style={{ height: 'auto', width: 'auto' }}
      onClick={download}
      className='globalbutton'
     >
      Store Page
     </button>
     <button
      style={{ height: 'auto', width: 'auto' }}
      onClick={download}
      className='globalbutton'
     >
      Forum
     </button>
     <button
      style={{ height: 'auto', width: 'auto' }}
      onClick={download}
      className='globalbutton'
     >
      Support
     </button>
    </div>
    <div className='Gamepage-Body'>
     <div className='Gamepage-Lists'>
      <ul>
       <li>
        <h3 className='globalHeader'>Friends to play with:</h3>
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
         <Link to='#' style={{ background: 'rgb(0,0,0,.9)' }}>
          {friend.name}
         </Link>
        </li>
       ))}
      </ul>
      <ul>
       <li>
        <h3>Friend Achievements:</h3>
       </li>
       <li
        className='banner'
        style={{
         backgroundImage: `url('https://png.pngtree.com/thumb_back/fw800/back_our/20190625/ourmid/pngtree-red-flame-burning-game-banner-background-image_259947.jpg')`,
        }}
       >
        <div
         className='profilepicture'
         style={{
          backgroundImage: `url('https://www.famousbirthdays.com/faces/marshmello-image.jpg')`,
         }}
        ></div>
        <Link to='#' style={{ background: 'rgb(0,0,0,.9)' }}>
         Parathax
        </Link>
       </li>
      </ul>
     </div>
     <div>
      <div className='Gamepage-News'>
       <h2 className='globalHeaderL'>Game News:</h2>
       <ul>
        <li>
         <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente
          magnam neque sed facere laboriosam iusto repudiandae et eius eos
          soluta recusandae reiciendis numquam, quo dolores veritatis. Ad
          laborum incidunt officia.
         </p>
         <h4 className='globalHeaderL' style={{ color: 'red' }}>
          04/25/3001
         </h4>
        </li>
        <li>
         <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente
          magnam neque sed facere laboriosam iusto repudiandae et eius eos
          soluta recusandae reiciendis numquam, quo dolores veritatis. Ad
          laborum incidunt officia.
         </p>
         <h4 className='globalHeaderL' style={{ color: 'red' }}>
          07/05/3001
         </h4>
        </li>
        <li>
         <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente
          magnam neque sed facere laboriosam iusto repudiandae et eius eos
          soluta recusandae reiciendis numquam, quo dolores veritatis. Ad
          laborum incidunt officia.
         </p>
         <h4 className='globalHeaderL' style={{ color: 'red' }}>
          12/31/3001
         </h4>
        </li>
       </ul>
      </div>
      <br />
      <br />
      <div>
       <h2>Patch Notes:</h2>
       <ul>
        <li>
         <h4 style={{ color: 'red' }}>7.05</h4>
         <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis
          repellat modi perferendis impedit soluta aliquid unde ea nihil ex
          doloribus distinctio eaque dolore, suscipit, quisquam adipisci fugiat
          sed fuga. Libero!
         </p>
        </li>
        <li>
         <h4 style={{ color: 'red' }}>7.06</h4>
         <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis
          repellat modi perferendis impedit soluta aliquid unde ea nihil ex
          doloribus distinctio eaque dolore, suscipit, quisquam adipisci fugiat
          sed fuga. Libero!
         </p>
        </li>
       </ul>
      </div>
     </div>
    </div>
   </div>
  );
 } else {
  return <div></div>;
 }
};

export default Game;
