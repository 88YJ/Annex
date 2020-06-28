import React, { useReducer } from "react";
import ModalContext from "./modalContext";
import modalReducer from "./modalReducer";
import { SHOW_MODAL_WITH_ADD_SERVER, HIDE_MODAL } from "../types";

const ModalState = (props) => {
 const initialState = {
  show: false,
  addServer: false,
 };
 const [state, dispatch] = useReducer(modalReducer, initialState);

 // Show Modal
 const showModalWithAddServer = async () => {
  try {
   dispatch({ type: SHOW_MODAL_WITH_ADD_SERVER });
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
    showModalWithAddServer,
    hideModal,
   }}
  >
   {props.children}
  </ModalContext.Provider>
 );
};

export default ModalState;
