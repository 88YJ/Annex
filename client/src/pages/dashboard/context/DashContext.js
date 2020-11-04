import React, { useReducer } from 'react';
import { initialState, DashReducer } from './DashReducer';

const DashStateContext = React.createContext();
const DashDispatchContext = React.createContext();

export function useDashState() {
  const context = React.useContext(DashStateContext);
  if (context === undefined) {
    throw new Error('useDashState must be used within a DashProvider');
  }

  return context;
}

export function useDashDispatch() {
  const context = React.useContext(DashDispatchContext);
  if (context === undefined) {
    throw new Error('useDashDispatch must be used within a DashProvider');
  }

  return context;
}

export const DashProvider = ({ children }) => {
  const [dash, dispatch] = useReducer(DashReducer, initialState);

  return (
    <DashStateContext.Provider value={dash}>
      <DashDispatchContext.Provider value={dispatch}>{children}</DashDispatchContext.Provider>
    </DashStateContext.Provider>
  );
};
