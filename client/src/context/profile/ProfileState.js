import React, { useReducer, useContext } from "react";
import ProfileContext from "./profileContext";
import profileReducer from "./profileReducer";
import {
 SET_PROFILE,
 GET_INCOMING_FRIEND_REQUESTS,
 GET_FRIENDS_LIST,
} from "../types";
import Axios from "axios";

import Logo from "../../components/layout/Logo.jpg";

const ProfileState = (props) => {
 const initialState = {
  profile: {},
  incomingRequests: [],
  friendList: [],
 };
 const [state, dispatch] = useReducer(profileReducer, initialState);

 const config = {
  headers: {
   "Content-Type": "application/json",
  },
 };
 // Set Current Profile
 const setCurrentProfile = async (profile) => {
  try {
   dispatch({ type: SET_PROFILE, payload: profile });
   getIncomingFriendRequests();
  } catch (err) {
   console.log("Couldn't find profile");
  }
 };

 const getIncomingFriendRequests = async () => {
  try {
   const res = await Axios.get("api/users/friendrequests", config);
   dispatch({ type: GET_INCOMING_FRIEND_REQUESTS, payload: res.data });
  } catch (err) {
   console.log("Couldn't load friend requests");
  }
 };

 const getFriendsList = async () => {
  try {
   const res = await Axios.get("api/users/friends", config);
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

 return (
  <ProfileContext.Provider
   value={{
    profile: state.profile,
    incomingRequests: state.incomingRequests,
    friendList: state.friendList,
    getFriendsList,
    setCurrentProfile,
    sendFriendRequest,
    acceptFriendRequest,
   }}
  >
   {props.children}
  </ProfileContext.Provider>
 );
};

export default ProfileState;
