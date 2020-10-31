import React, { useState, useContext } from 'react';
import ModalContext from '../../context/modal/modalContext';

const CreateServerForm = () => {
 const modalContext = useContext(ModalContext);
 const { screenShotLink } = modalContext;

 return (
  <img style={{ height: '500px', width: 'auto' }} src={screenShotLink} alt='' />
 );
};

export default CreateServerForm;
