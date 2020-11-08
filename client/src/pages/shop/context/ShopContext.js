import React, { useReducer } from 'react';
import { initialState, ShopReducer } from './ShopReducer';

const ShopStateContext = React.createContext();
const ShopDispatchContext = React.createContext();

export function useShopState() {
  const context = React.useContext(ShopStateContext);
  if (context === undefined) {
    throw new Error('useShopState must be used within a ShopProvider');
  }

  return context;
}

export function useShopDispatch() {
  const context = React.useContext(ShopDispatchContext);
  if (context === undefined) {
    throw new Error('useShopDispatch must be used within a ShopProvider');
  }

  return context;
}

export const ShopProvider = ({ children }) => {
  const [shop, dispatch] = useReducer(ShopReducer, initialState);

  return (
    <ShopStateContext.Provider value={shop}>
      <ShopDispatchContext.Provider value={dispatch}>{children}</ShopDispatchContext.Provider>
    </ShopStateContext.Provider>
  );
};
