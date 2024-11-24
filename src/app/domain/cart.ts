import { CartAppActions } from "./app-cart";
import { CartState, CartDispatchObject } from "../reducer/cart";

export interface CartItem {
  id: number;
  title: string;
  quantity: number;
  price: number;
  stock: number;
  thumbnail : string;
}

export interface CartContextType {
  state: CartState;
  dispatch: React.Dispatch<CartDispatchObject<CartAppActions>>;
  getCartQuantity: () => number;
  getCartPrice: () => number;
  showCartCounter: boolean;
}
