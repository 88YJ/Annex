import React, { useContext, useEffect, Fragment } from "react";

import AuthContext from "../../context/auth/authContext";
import ServerlistContext from "../../context/serverlists/serverlistContext";
import ServerContext from "../../context/server/serverContext";
import ModalContext from "../../context/modal/modalContext";

import { Link } from "react-router-dom";

const Serverlist = () => {
 //background = 'https://wallpaperplay.com/walls/full/e/0/3/21596.jpg';

 const authContext = useContext(AuthContext);

 const serverlistContext = useContext(ServerlistContext);

 const modalContext = useContext(ModalContext);

 const serverContext = useContext(ServerContext);

 const { setCurrentServer, serverLogo } = serverContext;
 const { userServerList, getUserServers } = serverlistContext;
 const { showModalWithAddServer } = modalContext;

 useEffect(() => {
  authContext.loadUser();
  getUserServers();
  // eslint-disable-next-line
 }, []);

 const displayModal = () => {
  showModalWithAddServer();
 };

 function openServer(server) {
  setCurrentServer(server);
 }

 if (userServerList == null) {
  return (
   <Fragment>
    <div className='footer'>
     <div
      className='serverimg'
      style={{
       backgroundImage: `url(${serverLogo})`,
      }}
     ></div>
     <div className='bottomlists'></div>
     <div>Stream</div>
    </div>
   </Fragment>
  );
 } else {
  return (
   <Fragment>
    <div className='footer'>
     <div
      className='serverimg'
      style={{
       backgroundImage: `url(${serverLogo})`,
      }}
     ></div>
     <div className='bottomlists'>
      <div className='servers'>
       <ul>
        <li key='addServer' onClick={displayModal}>
         <div
          className='serverimgsmall'
          style={{
           backgroundImage: "url('https://img.icons8.com/cotton/2x/plus.png')",
          }}
         ></div>
        </li>
        {userServerList.map((server, i) => (
         <Link to='/server'>
          <li key={i} onClick={() => openServer(server)}>
           <div
            className='serverimgsmall'
            style={{
             backgroundImage: `url(${server.img})`,
            }}
           ></div>
          </li>
         </Link>
        ))}
       </ul>
      </div>
     </div>
     <div className='rightbottom'>Stream</div>
    </div>
   </Fragment>
  );
 }
};

export default Serverlist;
