import React, { useContext, useEffect, Fragment } from "react";

import AuthContext from "../../context/auth/authContext";
import ServerlistContext from "../../context/serverlists/serverlistContext";
import ModalContext from "../../context/modal/modalContext";

import Logo from "./Logo.jpg";
import Modal from "./Modal";

const Serverlist = () => {
 let background = Logo;

 //background = 'https://wallpaperplay.com/walls/full/e/0/3/21596.jpg';

 const authContext = useContext(AuthContext);

 const serverlistContext = useContext(ServerlistContext);

 const modalContext = useContext(ModalContext);

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

 if (servers == null) {
  return (
   <Fragment>
    <div className='footer'>
     <div
      className='serverimg'
      style={{
       backgroundImage: `url(${background})`,
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
       backgroundImage: `url(${background})`,
      }}
     ></div>
     <div className='bottomlists'>
      <div className='servers'>
       <ul>
        {servers.map((server) => (
         <li key={server._id}>
          <div
           className='serverimgsmall'
           style={{
            backgroundImage: `url(${server.img})`,
           }}
          ></div>
         </li>
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
