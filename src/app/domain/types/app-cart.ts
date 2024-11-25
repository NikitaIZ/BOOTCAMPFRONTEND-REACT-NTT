import { Dispatch } from "react";
import { CartDispatchObject } from "../../reducer/cart";

export type CartAppDispatch = Dispatch<CartDispatchObject<CartAppActions>>;

export const enum CartAppActions {
    CartAddProduct = "CART_ADD_PRODUCT",
    CartRemoveProduct = "CART_REMOVE_PRODUCT",
    CartDeleteProduct = "CART_DELETE_PRODUCT",
    CartDeleteAllProducts = "CART_DELETE_ALL_PRODUCTS"
}

