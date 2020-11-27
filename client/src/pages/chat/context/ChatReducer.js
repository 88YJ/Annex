import { UPDATE_USER_LIST } from "./types";

export const initialState = {
    userList: [],
    loading: true
}

export const ChatReducer = (initialState, action) => {
    switch (action.type) {
        case UPDATE_USER_LIST:
            return {
                ...initialState,
                userList: action.payload
            }

        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
};