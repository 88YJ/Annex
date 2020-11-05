import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { Profile } from '../../components/browser/Profile';
import { useProfileState, useProfileDispatch, loadCurrentProfile, getProfiles } from '../../pages/profile/context';

export const ProfilePage = () => {
  const { ProfilesLoaded, Profiles, CurrentProfile } = useProfileState();
  const profileDispatch = useProfileDispatch();
  const { profile_id } = useParams();

  useEffect(() => {
    if (!ProfilesLoaded) {
      getProfiles(profileDispatch);
    }
  }, []);

  useEffect(() => {
    if (ProfilesLoaded) {
      let profile = Profiles.filter((profile) => profile._id === profile_id);
      loadCurrentProfile(profileDispatch, profile[0]);
    }
  }, [ProfilesLoaded, profileDispatch, Profiles, profile_id]);

  if (CurrentProfile) {
    return <Profile />;
  }
  return <div></div>;
};
