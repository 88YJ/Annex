import React, { useReducer } from "react";
import ModalContext from "./modalContext";
import modalReducer from "./modalReducer";
import { SHOW_MODAL, HIDE_MODAL } from "../types";

const ModalState = (props) => {
 const initialState = {
  show: false,
  createServer: false,
 };
 const [state, dispatch] = useReducer(modalReducer, initialState);

 // Show Modal
 const showModal = async () => {
  try {
   dispatch({ type: SHOW_MODAL });
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
    showModal,
    hideModal,
   }}
  >
   {props.children}
  </ModalContext.Provider>
 );
};

export default ModalState;
