import React, { useReducer } from "react";
import ModalContext from "./modalContext";
import modalReducer from "./modalReducer";
import {
 SHOW_MODAL_WITH_ADD_SERVER,
 HIDE_MODAL,
 SHOW_MODAL_WITH_ADD_CHANNEL,
} from "../types";

const ModalState = (props) => {
 const initialState = {
  show: false,
  addServer: false,
  addChannel: false,
 };
 const [state, dispatch] = useReducer(modalReducer, initialState);

 // Show Modal with add server content
 const showModalWithAddServer = async () => {
  try {
   dispatch({ type: SHOW_MODAL_WITH_ADD_SERVER });
  } catch (err) {
   console.log("Couldn't display modal");
  }
 };

 // Show Modal with add channel content
 const showModalWithAddChannel = async () => {
  try {
   dispatch({ type: SHOW_MODAL_WITH_ADD_CHANNEL });
  } catch (err) {
   console.log("Couldn't display modal");
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
    showModalWithAddServer,
    showModalWithAddChannel,
    hideModal,
   }}
  >
   {props.children}
  </ModalContext.Provider>
 );
};

export default ModalState;
