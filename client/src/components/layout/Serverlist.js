import React, { useContext, useEffect, Fragment } from "react";

import AuthContext from "../../context/auth/authContext";
import ServerlistContext from "../../context/serverlists/serverlistContext";
import ServerContext from "../../context/server/serverContext";
import ModalContext from "../../context/modal/modalContext";

import Modal from "./Modal";
import { Link } from "react-router-dom";

const Serverlist = () => {
 //background = 'https://wallpaperplay.com/walls/full/e/0/3/21596.jpg';

 const authContext = useContext(AuthContext);

 const serverlistContext = useContext(ServerlistContext);

 const modalContext = useContext(ModalContext);

 const serverContext = useContext(ServerContext);

 const { setCurrentServer, serverLogo } = serverContext;
 const { servers, getServers } = serverlistContext;
 const { showModal } = modalContext;

 useEffect(() => {
  authContext.loadUser();
  getServers();
  // eslint-disable-next-line
 }, []);

 const displayModal = () => {
  showModal();
 };

 function openServer(server) {
  setCurrentServer(server);
 }

 if (servers == null) {
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
        {servers.map((server) => (
         <Link to='/server'>
          <li key={server._id} onClick={() => openServer(server)}>
           <div
            className='serverimgsmall'
            style={{
             backgroundImage: `url(${server.img})`,
            }}
           ></div>
          </li>
         </Link>
        ))}
        <li key='addServer' onClick={displayModal}>
         <div
          className='serverimgsmall'
          style={{
           backgroundImage: "url('https://img.icons8.com/cotton/2x/plus.png')",
          }}
         ></div>
        </li>
       </ul>
      </div>
     </div>
     <div>Stream</div>
    </div>
    <Modal />
   </Fragment>
  );
 }
};

export default Serverlist;
