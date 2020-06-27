import React, { useContext, useEffect, Fragment } from "react";

import AuthContext from "../../context/auth/authContext";
import ServerlistContext from "../../context/serverlists/serverlistContext";

import Modal from "./Modal";

const Serverlist = () => {
 const authContext = useContext(AuthContext);

 const serverlistContext = useContext(ServerlistContext);

 const { servers, getServers } = serverlistContext;

 useEffect(() => {
  authContext.loadUser();
  getServers();
  // eslint-disable-next-line
 }, []);

 if (servers == null) {
  return (
   <Fragment>
    <div className='footer'>
     <div
      className='serverimg'
      style={{
       backgroundImage:
        "url('https://wallpaperplay.com/walls/full/e/0/3/21596.jpg')",
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
       backgroundImage:
        "url('https://wallpaperplay.com/walls/full/e/0/3/21596.jpg')",
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
        <li key='createserver'>
         <div
          className='serverimgsmall'
          style={{
           backgroundImage: "url('https://img.icons8.com/cotton/2x/plus.png')",
          }}
         ></div>
         <Modal />
        </li>
       </ul>
      </div>
     </div>
     <div>Stream</div>
    </div>
   </Fragment>
  );
 }
};

export default Serverlist;
