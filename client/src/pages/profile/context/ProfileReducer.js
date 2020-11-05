import { CAPTURE_FRIENDS, CAPTURE_PROFILES, LOAD_CURRENT_PROFILE } from './types';

export const initialState = {
  Friends: [],
  FriendsLoaded: false,
  Profiles: [],
  ProfilesLoaded: false,
  CurrentProfile: undefined,
};

export const ProfileReducer = (initialState, action) => {
  switch (action.type) {
    case CAPTURE_FRIENDS:
      return {
        ...initialState,
        Friends: action.payload,
        FriendsLoaded: true,
      };
    case CAPTURE_PROFILES:
      return {
        ...initialState,
        Profiles: action.payload,
        ProfilesLoaded: true,
      };
    case LOAD_CURRENT_PROFILE:
      return {
        ...initialState,
        CurrentProfile: action.payload,
      };

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};
