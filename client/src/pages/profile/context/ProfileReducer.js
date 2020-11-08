import { CAPTURE_FRIENDS, CAPTURE_PROFILES, LOAD_CURRENT_PROFILE, CAPTURE_GAMES, SET_OWNED_CURRENT_GAME } from './types';

export const initialState = {
  Friends: [],
  FriendsLoaded: false,
  Profiles: [],
  ProfilesLoaded: false,
  CurrentProfile: undefined,
  ownedGames: [],
  ownedGamesLoaded: false,
  CurrentOwnedGame: undefined,
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
    case CAPTURE_GAMES:
      return {
        ...initialState,
        ownedGames: action.payload,
        ownedGamesLoaded: true,
      };
    case SET_OWNED_CURRENT_GAME:
      return {
        ...initialState,
        CurrentOwnedGame: action.payload,
      };

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};
