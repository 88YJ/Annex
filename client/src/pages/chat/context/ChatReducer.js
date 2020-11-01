import { JOIN_VOICE_CHAT, SET_SOCKET, UPDATE_USERLIST, UPDATE_RTC_PEER_CONNECTION, SET_REMOTE_STREAM } from "./types";

const configuration = { 'iceServers': [{ 'urls': 'stun:stun.l.google.com:19302' }] }

export const initialState = {
    socket: undefined,
    userList: {},
    rtcPeerConnection: new RTCPeerConnection(configuration),
    localStream: undefined,
    remoteStream: undefined,
    loading: true
}

export const ChatReducer = (initialState, action) => {
    switch (action.type) {
        case JOIN_VOICE_CHAT:
            return {
                ...initialState,
                localStream: action.payload,
                loading: false
            };
        case SET_SOCKET:
            return {
                ...initialState,
                socket: action.payload
            }
        case UPDATE_USERLIST:
            return {
                ...initialState,
                userList: { ...initialState.userList, [action.payload.socket]: action.payload.rtc }
            }
        case UPDATE_RTC_PEER_CONNECTION:
            return {
                ...initialState,
                rtcPeerConnection: action.payload
            }
        case SET_REMOTE_STREAM:
            return {
                ...initialState,
                remoteStream: action.payload
            }

        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
};