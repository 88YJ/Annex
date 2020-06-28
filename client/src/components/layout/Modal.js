import React, { Fragment, useContext } from "react";
import ModalContext from "../../context/modal/modalContext";
import CreateServerForm from "./CreateServerForm";

const Modal = () => {
 const modalContext = useContext(ModalContext);

 const { show, addServer, hideModal } = modalContext;

 const onHideModal = () => {
  hideModal();
 };

 const createServerContent = (
  <div className='modal'>
   <div className='modal-content'>
    <span className='close' onClick={onHideModal}>
     &times;
    </span>
    <CreateServerForm />
   </div>
  </div>
 );

 const defaultContent = <Fragment></Fragment>;

 return (
  <Fragment>
   {show && addServer ? createServerContent : defaultContent}
  </Fragment>
 );
};

export default Modal;
