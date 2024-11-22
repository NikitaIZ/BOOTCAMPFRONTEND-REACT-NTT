import { Products } from "../domain/product";

export interface CartItem {
  id: number;
  quantity: number;
}

export interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Products) => void;
  getCartQuantity: () => number;
  removeFromCart: (productId: number) => void; 
  showCartCounter: boolean;
}
