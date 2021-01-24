import { CAPTURE_FRIENDS, CAPTURE_PROFILES, LOAD_CURRENT_PROFILE, CAPTURE_GAMES, SET_OWNED_CURRENT_GAME, GET_INCOMING_FRIEND_REQUESTS, LOAD_LOCAL_GAMES } from './types'

let localGames = localStorage.getItem('localGames') ? JSON.parse(localStorage.getItem('localGames')) : []

export const initialState = {
    Friends: [],
    FriendsLoaded: false,
    Profiles: [],
    ProfilesLoaded: false,
    CurrentProfile: undefined,
    ownedGames: [],
    localGames: localGames,
    ownedGamesLoaded: false,
    CurrentOwnedGame: undefined,
    incomingRequests: [],
}

export const ProfileReducer = (initialState, action) => {
    switch (action.type) {
        case CAPTURE_FRIENDS:
            return {
                ...initialState,
                Friends: action.payload,
                FriendsLoaded: true,
            }
        case CAPTURE_PROFILES:
            return {
                ...initialState,
                Profiles: action.payload,
                ProfilesLoaded: true,
            }
        case LOAD_CURRENT_PROFILE:
            return {
                ...initialState,
                CurrentProfile: action.payload,
            }
        case CAPTURE_GAMES:
            return {
                ...initialState,
                ownedGames: action.payload,
                ownedGamesLoaded: true,
            }
        case SET_OWNED_CURRENT_GAME:
            return {
                ...initialState,
                CurrentOwnedGame: action.payload,
            }
        case GET_INCOMING_FRIEND_REQUESTS:
            return {
                ...initialState,
                incomingRequests: action.payload,
            }
        case LOAD_LOCAL_GAMES: 
            return {
                ...initialState,
                localGames: JSON.parse(localStorage.getItem('localGames'))
            }

        default:
            throw new Error(`Unhandled action type: ${action.type}`)
    }
}
