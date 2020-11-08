import { SET_SOCKET, SET_LOCAL_STREAM, SET_REMOTE_STREAM, UPDATE_USER_LIST } from "./types";
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

export async function setLocalStream(dispatch, payload) {
    try {
        dispatch({ type: SET_LOCAL_STREAM, payload: payload });
        console.log("Local stream successfully set.");
    } catch (error) {
        console.error(error)
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

export async function updateUserList(dispatch, payload) {
    try {
        dispatch({ type: UPDATE_USER_LIST, payload: payload });
        console.log("User list successfully updated.");
    } catch (error) {
        console.error(error)
    }
}


