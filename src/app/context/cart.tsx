import { createContext, useReducer, useContext, useState, ReactNode, useEffect } from "react";
import { cartReducer, initialCartState, CartState } from "../reducer/cart";
import { CartContextType } from "../domain/cart";

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const initializer = (): CartState => {
    try {
      const storedCart = localStorage.getItem("cart");
      return storedCart
        ? { items: JSON.parse(storedCart) }
        : { items: [] };
    } catch {
      return { items: [] };
    }
  };

  const [state, dispatch] = useReducer(cartReducer, initialCartState, initializer);
  const [showCartCounter, setShowCartCounter] = useState(false);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state.items));
    setShowCartCounter(state.items.length > 0);
  }, [state]);

  const getCartQuantity = () =>
    state.items.reduce((total, item) => total + item.quantity, 0);

  const getCartPrice = () =>
    state.items.reduce((total, item) => total + (item.quantity * item.price), 0);

  return (
    <CartContext.Provider value={{ state, dispatch, getCartQuantity, getCartPrice, showCartCounter }}>
      {children}
    </CartContext.Provider>
  );
};


export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart debe usarse dentro de un CartProvider");
  }
  return context;
};
