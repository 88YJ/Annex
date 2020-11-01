import React, { useReducer } from "react";
import { initialState, ServerReducer } from './ServerReducer';

const ServerStateContext = React.createContext();
const ServerDispatchContext = React.createContext();

export function useServerState() {
    const context = React.useContext(ServerStateContext);
    if (context === undefined) {
        throw new Error("useServerState must be used within a ServerProvider");
    }

    return context;
}

export function useServerDispatch() {
    const context = React.useContext(ServerDispatchContext);
    if (context === undefined) {
        throw new Error("useServerDispatch must be used within a ServerProvider");
    }

    return context;
}

export const ServerProvider = ({ children }) => {

    const [server, dispatch] = useReducer(ServerReducer, initialState);

    return (
        <ServerStateContext.Provider value={server}>
            <ServerDispatchContext.Provider value={dispatch}>
                {children}
            </ServerDispatchContext.Provider>
        </ServerStateContext.Provider>
    );
};