import { SET_SOCKET, SET_LOCAL_STREAM, SET_REMOTE_STREAM, UPDATE_USER_LIST } from "./types";

export const initialState = {
    socket: undefined,
    userList: [],
    localStream: undefined,
    remoteStream: undefined,
    loading: true
}

export const ChatReducer = (initialState, action) => {
    switch (action.type) {
        case SET_SOCKET:
            return {
                ...initialState,
                socket: action.payload
            }
        case SET_LOCAL_STREAM:
            return {
                ...initialState,
                localStream: action.payload,
                loading: false
            }
        case SET_REMOTE_STREAM:
            return {
                ...initialState,
                remoteStream: action.payload
            }
        case UPDATE_USER_LIST:
            return {
                ...initialState,
                userList: [...initialState.userList, action.payload]
            }

        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
};