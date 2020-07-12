import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import ProfileContext from "../../context/profile/profileContext";

const EditProfileForm = () => {
 const profileContext = useContext(ProfileContext);
 const { editProfile } = profileContext;
 const [profile, setProfile] = useState({
  profilePicture: "",
  background: "",
  banner: "",
 });

 const { profilePicture, background, banner } = profile;

 const onChange = (e) =>
  setProfile({ ...profile, [e.target.name]: e.target.value });

 const onSubmit = (e) => {
  e.preventDefault();
  editProfile(profile);
  setProfile({
   profilePicture: "",
   background: "",
   banner: "",
  });
  window.location.reload(false);
 };

 return (
  <form onSubmit={onSubmit}>
   <h2>Edit Profile</h2>
   <input
    type='url'
    placeholder='Profile Picture'
    name='profilePicture'
    value={profilePicture}
    onChange={onChange}
   />
   <input
    type='url'
    placeholder='Background'
    name='background'
    value={background}
    onChange={onChange}
   />
   <input
    type='url'
    placeholder='Banner'
    name='banner'
    value={banner}
    onChange={onChange}
   />
   <div>
    <input type='submit' value='Submit Changes' />
   </div>
  </form>
 );
};

export default EditProfileForm;
