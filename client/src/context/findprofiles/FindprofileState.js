import React, { useReducer } from 'react';
import FindprofileContext from './findprofileContext';
import findprofileReducer from './findprofileReducer';
import { GET_PROFILE } from '../types';
import Axios from 'axios';

const FindprofileState = (props) => {
 const initialState = {
  profiles: [],
 };

 const [state, dispatch] = useReducer(findprofileReducer, initialState);

 //Get Profiles
 const getProfiles = async () => {
  try {
   const res = await Axios.get('/api/users/');

   dispatch({ type: GET_PROFILE, payload: res.data });
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
