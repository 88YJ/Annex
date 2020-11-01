import React, { useReducer } from "react";
import { initialState, ChatReducer } from './ChatReducer';

const ChatStateContext = React.createContext();
const ChatDispatchContext = React.createContext();

export function useChatState() {
    const context = React.useContext(ChatStateContext);
    if (context === undefined) {
        throw new Error("useChatState must be used within a ChatProvider");
    }

    return context;
}

export function useChatDispatch() {
    const context = React.useContext(ChatDispatchContext);
    if (context === undefined) {
        throw new Error("useChatDispatch must be used within a ChatProvider");
    }

    return context;
}

export const ChatProvider = ({ children }) => {

    const [chat, dispatch] = useReducer(ChatReducer, initialState);

    return (
        <ChatStateContext.Provider value={chat}>
            <ChatDispatchContext.Provider value={dispatch}>
                {children}
            </ChatDispatchContext.Provider>
        </ChatStateContext.Provider>
    );
};