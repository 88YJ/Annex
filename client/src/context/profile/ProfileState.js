import React, { useReducer, useContext } from 'react';
import ProfileContext from './profileContext';
import profileReducer from './profileReducer';
import {
 SET_PROFILE,
 GET_INCOMING_FRIEND_REQUESTS,
 GET_FRIENDS_LIST,
 GET_PROFILE,
} from '../types';
import Axios from 'axios';

const ProfileState = (props) => {
 const initialState = {
  profile: {},
  incomingRequests: [],
  friendList: [],
  profiles: [],
 };
 const [state, dispatch] = useReducer(profileReducer, initialState);

 const config = {
  headers: {
   'Content-Type': 'application/json',
  },
 };
 // Make DM Channel for Friend
 const createDMChannel = async (user) => {};

 const getIncomingFriendRequests = async () => {
  try {
   const res = await Axios.get('api/users/friendrequests', config);
   dispatch({ type: GET_INCOMING_FRIEND_REQUESTS, payload: res.data });
  } catch (err) {
   console.log("Couldn't load friend requests");
  }
 };

 const getFriendsList = async () => {
  try {
   const res = await Axios.get('api/users/friends', config);
   dispatch({ type: GET_FRIENDS_LIST, payload: res.data });
  } catch (err) {
   console.log("Couldn't load friend list");
  }
 };

 const sendFriendRequest = async () => {
  try {
   const res = await Axios.put(
    `api/users/sendfriendrequest/${state.profile._id}`
   );
   //getIncomingFriendRequests();
  } catch (err) {
   console.log("Couldn't send a friend request");
  }
 };

 const acceptFriendRequest = async (request) => {
  try {
   const res = await Axios.put(`api/users/acceptfriendrequest/${request}`);
   getIncomingFriendRequests();
   getFriendsList();
   console.log(res.data);
  } catch (err) {
   console.log("Couldn't accept a friend request");
  }
 };

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
 const getIdProfile = async (profile) => {
  try {
   const res = await Axios.get(`/api/users/profile/${profile._id}`, config);
   console.log('logged' + res.data);
   dispatch({ type: SET_PROFILE, payload: res.data });
   getIncomingFriendRequests();
  } catch (err) {
   console.log('no profiles to display');
  }
 };

 return (
  <ProfileContext.Provider
   value={{
    profile: state.profile,
    incomingRequests: state.incomingRequests,
    friendList: state.friendList,
    profiles: state.profiles,
    getProfiles,
    getFriendsList,
    sendFriendRequest,
    acceptFriendRequest,
    createDMChannel,
    getIdProfile,
   }}
  >
   {props.children}
  </ProfileContext.Provider>
 );
};

export default ProfileState;
