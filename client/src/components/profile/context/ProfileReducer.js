import { CAPTURE_FRIENDS } from './types';

export const initialState = {
  Friends: [],
  FriendsLoaded: false,
};

export const ProfileReducer = (initialState, action) => {
  switch (action.type) {
    case CAPTURE_FRIENDS:
      return {
        ...initialState,
        Friends: action.payload,
        FriendsLoaded: true,
      };

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};
