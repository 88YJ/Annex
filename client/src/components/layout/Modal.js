import React, { Fragment, useContext } from "react";
import ModalContext from "../../context/modal/modalContext";

const Modal = () => {
 const modalContext = useContext(ModalContext);

 const { show } = modalContext;
 /*
 const guessLinks = (
  <Fragment>
   <li>
    <Link to='/register'>Register</Link>
   </li>
   <li>
    <Link to='/login'>Login</Link>
   </li>
  </Fragment>
 );
*/
 return (
  <Fragment>
   <h3>Display: {show.toString()}</h3>
  </Fragment>
 );
};

export default Modal;
