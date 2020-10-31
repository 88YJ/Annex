import React, { useReducer } from 'react';
import ModalContext from './modalContext';
import modalReducer from './modalReducer';
import {
 SHOW_MODAL_WITH_ADD_SERVER,
 HIDE_MODAL,
 SHOW_MODAL_WITH_ADD_CHANNEL,
 SHOW_MODAL_WITH_EDIT_PROFILE,
 SHOW_MODAL_WITH_SCREENSHOT,
} from '../types';

const ModalState = (props) => {
 const initialState = {
  show: false,
  addServer: false,
  addChannel: false,
  editProfile: false,
  screenShot: false,
  screenShotLink: null,
 };
 const [state, dispatch] = useReducer(modalReducer, initialState);

 // Show Modal with add server content
 const showModalWithAddServer = async () => {
  try {
   dispatch({ type: SHOW_MODAL_WITH_ADD_SERVER });
  } catch (err) {
   console.log("Couldn't display modal with add server");
  }
 };

 // Show Modal with add channel content
 const showModalWithAddChannel = async () => {
  try {
   dispatch({ type: SHOW_MODAL_WITH_ADD_CHANNEL });
  } catch (err) {
   console.log("Couldn't display modal with add channel");
  }
 };

 const showModalWithEditProfile = async () => {
  try {
   dispatch({ type: SHOW_MODAL_WITH_EDIT_PROFILE });
  } catch (err) {
   console.log("Couldn't display modal with add channel");
  }
 };
 const showModalWithScreenshot = async (link) => {
  console.log(link);
  try {
   dispatch({ type: SHOW_MODAL_WITH_SCREENSHOT, payload: link });
  } catch (err) {
   console.log("Couldn't display modal with screenshot");
  }
 };

 // Hide Modal
 const hideModal = async () => {
  try {
   dispatch({ type: HIDE_MODAL });
  } catch (err) {
   console.log("Couldn't hide modal");
  }
 };

 return (
  <ModalContext.Provider
   value={{
    show: state.show,
    addServer: state.addServer,
    addChannel: state.addChannel,
    editProfile: state.editProfile,
    screenShot: state.screenShot,
    screenShotLink: state.screenShotLink,
    showModalWithAddServer,
    showModalWithAddChannel,
    showModalWithEditProfile,
    showModalWithScreenshot,
    hideModal,
   }}
  >
   {props.children}
  </ModalContext.Provider>
 );
};

export default ModalState;
