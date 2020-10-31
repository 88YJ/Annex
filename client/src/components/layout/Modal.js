import React, { Fragment, useContext } from 'react';
import ModalContext from '../../context/modal/modalContext';
import CreateServerForm from './CreateServerForm';
import CreateChannelForm from './CreateChannelForm';
import EditProfileForm from './EditProfileForm';
import ScreenshotForm from './Screenshot';

const Modal = () => {
 const modalContext = useContext(ModalContext);

 const {
  show,
  addServer,
  addChannel,
  editProfile,
  hideModal,
  screenShot,
 } = modalContext;

 const onHideModal = () => {
  hideModal();
 };

 const customContent = (content) => (
  <div className='modal'>
   <div style={{ height: 'auto' }} className='modal-content'>
    <span className='close' onClick={onHideModal}>
     &times;
    </span>
    {content}
   </div>
  </div>
 );

 const defaultContent = <Fragment></Fragment>;

 return (
  <Fragment>
   {show && addServer ? customContent(<CreateServerForm />) : defaultContent}
   {show && addChannel ? customContent(<CreateChannelForm />) : defaultContent}
   {show && editProfile ? customContent(<EditProfileForm />) : defaultContent}
   {show && screenShot ? customContent(<ScreenshotForm />) : defaultContent}
  </Fragment>
 );
};

export default Modal;
