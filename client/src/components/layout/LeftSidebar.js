import React, { useContext, useEffect } from "react";

import AuthContext from "../../context/auth/authContext";
import ServerContext from "../../context/server/serverContext";
import ModalContext from "../../context/modal/modalContext";

const LeftSidebar = () => {
 const authContext = useContext(AuthContext);

 const serverContext = useContext(ServerContext);

 const modalContext = useContext(ModalContext);

 const { server, serverSidebar } = serverContext;

 const { showModalWithAddChannel } = modalContext;

 useEffect(() => {
  authContext.loadUser();
  // eslint-disable-next-line
 }, []);

 const displayModal = () => {
  showModalWithAddChannel();
 };

 if (serverSidebar) {
  return (
   <div>
    <div className='serverchannels'>
     <h3 className='center'>{server.name}</h3>
     <ul>
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
  );
 } else {
  return (
   <div>
    <div className='serverchannels'>
     <h3 className='center'>Server:</h3>
    </div>
   </div>
  );
 }
};

export default LeftSidebar;
