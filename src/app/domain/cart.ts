import { AppCartActions } from "./App-cart";
import { CartState, DispatchObject } from "../reducer/cart";

export interface CartItem {
  id: number;
  quantity: number;
}

export interface CartContextType {
  state: CartState;
  dispatch: React.Dispatch<DispatchObject<AppCartActions>>;
  getCartQuantity: () => number;
  showCartCounter: boolean;
}
