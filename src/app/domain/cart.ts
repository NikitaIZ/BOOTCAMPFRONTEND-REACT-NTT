import { AppCartActions } from "./app-cart";
import { CartState, DispatchObject } from "../reducer/cart";

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
  dispatch: React.Dispatch<DispatchObject<AppCartActions>>;
  getCartQuantity: () => number;
  getCartPrice: () => number;
  showCartCounter: boolean;
}
