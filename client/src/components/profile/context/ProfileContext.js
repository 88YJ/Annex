import React, { useReducer } from 'react';
import { initialState, ProfileReducer } from './ProfileReducer';

const ProfileStateContext = React.createContext();
const ProfileDispatchContext = React.createContext();

export function useProfileState() {
  const context = React.useContext(ProfileStateContext);
  if (context === undefined) {
    throw new Error('useProfileState must be used within a ProfileProvider');
  }

  return context;
}

export function useProfileDispatch() {
  const context = React.useContext(ProfileDispatchContext);
  if (context === undefined) {
    throw new Error('useProfileDispatch must be used within a ProfileProvider');
  }

  return context;
}

export const ProfileProvider = ({ children }) => {
  const [profile, dispatch] = useReducer(ProfileReducer, initialState);

  return (
    <ProfileStateContext.Provider value={profile}>
      <ProfileDispatchContext.Provider value={dispatch}>{children}</ProfileDispatchContext.Provider>
    </ProfileStateContext.Provider>
  );
};
