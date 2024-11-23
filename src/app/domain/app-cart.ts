import { Dispatch } from "react";
import { DispatchObject } from "../reducer/cart";

export type AppCartDispatch = Dispatch<DispatchObject<AppCartActions>>;

export const enum AppCartActions {
    AddProductToCart = "ADD_PRODUCT_TO_CART",
    RemoveProductFromCart = "REMOVE_PRODUCT_FROM_CART",
    DeleteProductFromCart = "DELETE_PRODUCT_FROM_CART"
}

