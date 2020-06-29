import React, { useReducer, useContext } from 'react';
import ProfileContext from './profileContext';
import profileReducer from './profileReducer';
import { SET_PROFILE } from '../types';
import Axios from 'axios';

import Logo from '../../components/layout/Logo.jpg';

const ProfileState = (props) => {
 const initialState = {
  profile: {},
 };
 const [state, dispatch] = useReducer(profileReducer, initialState);

 // Set Current Profile
 const setCurrentProfile = async (profile) => {
  try {
   dispatch({ type: SET_PROFILE, payload: profile });
  } catch (err) {
   console.log("Couldn't find server");
  }
 };

 return (
  <ProfileContext.Provider
   value={{
    profile: state.profile,
    setCurrentProfile,
   }}
  >
   {props.children}
  </ProfileContext.Provider>
 );
};

export default ProfileState;
