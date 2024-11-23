import { AppCartActions } from "../domain/app-cart";
import { Products } from "../domain/product";
import { CartItem } from "../domain/cart";

export interface CartState {
    items: CartItem[];
}

export const initialCartState: CartState = {
    items: [],
};

export interface DispatchObject<A, P = unknown> {
    type: A;
    payload?: P;
}

export const cartReducer = (
    state: CartState,
    { type, payload }: DispatchObject<AppCartActions>
): CartState => {
    switch (type) {
        case AppCartActions.AddProductToCart: {
            const product = payload as Products;
            const existingItem = state.items.find((item) => item.id === product.id);

            if (existingItem) {
                return {
                    ...state,
                    items: state.items.map((item) =>
                        item.id === product.id
                            ? { ...item, quantity: item.quantity + 1 }
                            : item
                    ),
                };
            }

            return {
                ...state,
                items: [
                    ...state.items,
                    {
                        id: product.id,
                        title: product.title,
                        quantity: 1,
                        price: product.price,
                        stock: product.stock,
                        thumbnail: product.thumbnail,
                    },
                ],
            };
        }

        case AppCartActions.RemoveProductFromCart: {
            const productId = payload as number;
            const existingItem = state.items.find((item) => item.id === productId);

            if (existingItem) {
                // Si la cantidad es mayor que 1, solo se reduce
                if (existingItem.quantity > 1) {
                    return {
                        ...state,
                        items: state.items.map((item) =>
                            item.id === productId
                                ? { ...item, quantity: item.quantity - 1 }
                                : item
                        ),
                    };
                } 
                // Si la cantidad es 1, se elimina el producto del carrito
                else {
                    return {
                        ...state,
                        items: state.items.filter((item) => item.id !== productId),
                    };
                }
            }
            return state;
        }

        case AppCartActions.DeleteProductFromCart: {
            const productId = payload as number;

            return {
                ...state,
                items: state.items.filter((item) => item.id !== productId),
            };
        }

        default:
            throw new Error("No se reconoce la acción despachada.");
    }
};
