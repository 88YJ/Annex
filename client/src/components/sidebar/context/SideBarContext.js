import React, { useReducer } from 'react';
import { initialState, SideBarReducer } from './SideBarReducer';

const SideBarStateContext = React.createContext();
const SideBarDispatchContext = React.createContext();

export function useSideBarState() {
  const context = React.useContext(SideBarStateContext);
  if (context === undefined) {
    throw new Error('useSideBarState must be used within a SideBarProvider');
  }

  return context;
}

export function useSideBarDispatch() {
  const context = React.useContext(SideBarDispatchContext);
  if (context === undefined) {
    throw new Error('useSideBarDispatch must be used within a SideBarProvider');
  }

  return context;
}

export const SideBarProvider = ({ children }) => {
  const [sidebar, dispatch] = useReducer(SideBarReducer, initialState);

  return (
    <SideBarStateContext.Provider value={sidebar}>
      <SideBarDispatchContext.Provider value={dispatch}>{children}</SideBarDispatchContext.Provider>
    </SideBarStateContext.Provider>
  );
};
