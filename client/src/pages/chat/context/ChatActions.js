import { UPDATE_USER_LIST } from "./types";

export async function updateUserList(dispatch, payload) {
    try {
        dispatch({ type: UPDATE_USER_LIST, payload: payload });
        console.log("User list successfully updated.");
    } catch (error) {
        console.error(error)
    }
}


