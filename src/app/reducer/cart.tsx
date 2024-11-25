import { Products } from "../domain/interfaces/products";
import { CartItem } from "../domain/interfaces/cart";
import { CartAppActions } from "../domain/types/app-cart";

export interface CartDispatchObject<A, T = unknown> {
    type: A;
    payload?: T;
}

export interface CartAppState {
    items: CartItem[];
    getCartQuantity: () => number;
    getCartPrice: () => number;
}

export const cartInitialState: CartAppState = {
    items: [],
    getCartQuantity: () => 0,
    getCartPrice: () => 0, 
};

const calculateCartQuantity = (items: CartItem[]) => items.reduce((total, item) => total + item.quantity, 0);

const calculateCartPrice = (items: CartItem[]) => items.reduce((total, item) => total + item.quantity * item.price, 0);

export const cartAppReducer = (
    state: CartAppState,
    { type, payload }: { type: CartAppActions; payload?: unknown }
): CartAppState => {
    switch (type) {
        case CartAppActions.CartAddProduct: {
            const product = payload as Products;
            const existingItem = state.items.find((item) => item.id === product.id);

            const updatedItems = existingItem
                ? state.items.map((item) =>
                      item.id === product.id
                          ? { ...item, quantity: item.quantity + 1 }
                          : item
                  )
                : [
                      ...state.items,
                      {
                          id: product.id,
                          title: product.title,
                          quantity: 1,
                          price: product.price,
                          stock: product.stock,
                          thumbnail: product.thumbnail,
                      },
                  ];

            return {
                ...state,
                items: updatedItems,
                getCartQuantity: () => calculateCartQuantity(updatedItems),
                getCartPrice: () => calculateCartPrice(updatedItems),
            };
        }

        case CartAppActions.CartRemoveProduct: {
            const productId = payload as number;
            const existingItem = state.items.find((item) => item.id === productId);
        
            if (existingItem) {
                if (existingItem.quantity > 1) {
                    const updatedItems = state.items.map((item) =>
                        item.id === productId
                            ? { ...item, quantity: item.quantity - 1 }
                            : item
                    );
        
                    return {
                        ...state,
                        items: updatedItems,
                        getCartQuantity: () => calculateCartQuantity(updatedItems),
                        getCartPrice: () => calculateCartPrice(updatedItems),
                    };
                }
        
                const updatedItems = state.items.filter((item) => item.id !== productId);
        
                return {
                    ...state,
                    items: updatedItems,
                    getCartQuantity: () => calculateCartQuantity(updatedItems),
                    getCartPrice: () => calculateCartPrice(updatedItems),
                };
            }
        
            return state;
        }
        

        case CartAppActions.CartDeleteProduct:
            return {
                ...state,
                items: state.items.filter((item) => item.id !== (payload as number)),
            };

        case CartAppActions.CartDeleteAllProducts:
            return {
                ...state,
                items: [],
            };

        default:
            throw new Error("Acción desconocida en el cartReducer.");
    }
};
