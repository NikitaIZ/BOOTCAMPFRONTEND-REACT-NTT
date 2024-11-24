import { Dispatch } from "react";
import { DispatchObjectCart } from "../reducer/cart";

export type AppCartDispatch = Dispatch<DispatchObjectCart<AppCartActions>>;

export const enum AppCartActions {
    AddProductToCart = "ADD_PRODUCT_TO_CART",
    RemoveProductFromCart = "REMOVE_PRODUCT_FROM_CART",
    DeleteProductFromCart = "DELETE_PRODUCT_FROM_CART"
}

