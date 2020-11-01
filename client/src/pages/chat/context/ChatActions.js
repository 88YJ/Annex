import { JOIN_VOICE_CHAT, SET_SOCKET, UPDATE_USERLIST, UPDATE_RTC_PEER_CONNECTION, SET_REMOTE_STREAM } from "./types";
import io from "socket.io-client";

const ENDPOINT = ":5002";

export function setSocket(dispatch) {
    try {
        let socket = io.connect(ENDPOINT);

        dispatch({ type: SET_SOCKET, payload: socket });
        console.log("Socket set successfully.");
    } catch (error) {
        console.error(error)
    }
}

export async function joinVoiceChat(dispatch, payload) {
    try {
        dispatch({ type: JOIN_VOICE_CHAT, payload: payload });
        console.log("Voice chat joined successfully.");
    } catch (error) {
        console.error(error)
    }
}

export async function updateUserList(dispatch, payload) {
    try {
        const userObject = { socket: payload, rtc: undefined }
        dispatch({ type: UPDATE_USERLIST, payload: userObject });
        console.log("Chat user list updated.")
    } catch (error) {
        console.error(error);
    }
}

export async function updateRTCPeerConnection(dispatch, payload) {
    try {
        dispatch({ type: UPDATE_RTC_PEER_CONNECTION, payload: payload });
        console.log("RTC peer connection updated.")
    } catch (error) {
        console.error(error);
    }
}

export async function setRemoteStream(dispatch, payload) {
    try {
        dispatch({ type: SET_REMOTE_STREAM, payload: payload });
        console.log("Remote stream successfully set.");
    } catch (error) {
        console.error(error)
    }
}


