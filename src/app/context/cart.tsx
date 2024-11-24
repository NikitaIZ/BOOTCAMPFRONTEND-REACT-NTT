import { createContext, FC, PropsWithChildren, useReducer, useContext, useEffect } from "react";
import { CartAppDispatch } from "../domain/app-cart";
import { useLocalStorage } from "../hooks/useLocalStorage"; 
import { cartAppReducer, cartInitialState, CartAppState } from "../reducer/cart";

const CartAppStateContext = createContext<CartAppState | undefined>(undefined);
const CartAppDispatchContext = createContext<CartAppDispatch | undefined>(undefined);

const GlobalCartAppProvider: FC<PropsWithChildren> = ({ children }) => {
  const { storedValue, setStoredValue } = useLocalStorage<CartAppState>("cart", cartInitialState);

  const getCartQuantity = () => state.items.reduce((total, item) => total + item.quantity, 0);
  const getCartPrice = () => state.items.reduce((total, item) => total + item.quantity * item.price, 0);

  const enhancedState: CartAppState = {
    ...storedValue,
    getCartQuantity,
    getCartPrice,
  };

  const [state, dispatch] = useReducer(cartAppReducer, enhancedState);

  useEffect(() => {
    setStoredValue(state);
  }, [state, setStoredValue]);

  return (
    <CartAppStateContext.Provider value={enhancedState}>
      <CartAppDispatchContext.Provider value={dispatch}>
        {children}
      </CartAppDispatchContext.Provider>
    </CartAppStateContext.Provider>
  );
};

const useGlobalCartAppState = (): CartAppState => {
  const context = useContext(CartAppStateContext);
  if (!context) {
    throw new Error("useGlobalCartAppState must be used within CartAppStateContext");
  }
  return context;
};

const useGlobalCartAppDispatch = (): CartAppDispatch => {
  const context = useContext(CartAppDispatchContext);
  if (!context) {
    throw new Error("useGlobalCartAppDispatch must be used within CartAppDispatchContext");
  }
  return context;
};

export { GlobalCartAppProvider, useGlobalCartAppState, useGlobalCartAppDispatch };
