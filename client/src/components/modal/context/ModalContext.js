import React, { useReducer } from 'react'
import { initialState, ModalReducer } from './ModalReducer'

const ModalStateContext = React.createContext()
const ModalDispatchContext = React.createContext()

export function useModalState() {
    const context = React.useContext(ModalStateContext)
    if (context === undefined) {
        throw new Error('useModalState must be used within a ModalProvider')
    }

    return context
}

export function useModalDispatch() {
    const context = React.useContext(ModalDispatchContext)
    if (context === undefined) {
        throw new Error('useModalDispatch must be used within a ModalProvider')
    }

    return context
}

export const ModalProvider = ({ children }) => {
    const [modal, dispatch] = useReducer(ModalReducer, initialState)

    return (
        <ModalStateContext.Provider value={modal}>
            <ModalDispatchContext.Provider value={dispatch}>{children}</ModalDispatchContext.Provider>
        </ModalStateContext.Provider>
    )
}
