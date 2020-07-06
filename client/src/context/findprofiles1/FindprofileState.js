import React, { useReducer } from 'react';
import FindprofileContext from './findprofileContext';
import findprofileReducer from './findprofileReducer';
import { GET_PROFILE } from '../types';
import Axios from 'axios';

const FindprofileState = (props) => {
 const config = {
  headers: {
   'Content-Type': 'application/json',
  },
 };

 const initialState = {
  profiles: [],
 };

 const [state, dispatch] = useReducer(findprofileReducer, initialState);

 //Get Profiles
 const getProfiles = async () => {
  try {
   const res = await Axios.get('/api/users/');

   dispatch({ type: GET_PROFILE, payload: res.data });
   getIdProfile();
  } catch (err) {
   console.log('no profiles to display');
  }
 };
 //ID Get Profiles
 const getIdProfile = async () => {
  try {
   const res = await Axios.get(
    `/api/users/profile/5ee80ab4459e81d91804cb52`,
    config
   );
   console.log(res);
   //dispatch({ type: GET_PROFILE, payload: res.data });
  } catch (err) {
   console.log('no profiles to display');
  }
 };

 return (
  <FindprofileContext.Provider
   value={{
    profiles: state.profiles,
    getProfiles,
   }}
  >
   {props.children}
  </FindprofileContext.Provider>
 );
};

export default FindprofileState;
