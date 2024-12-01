import { cartAppReducer, cartInitialState } from "../cart";
import { CartAppActions } from "@/app/domain/types/app-cart";
import { CartItem } from "@/app/domain/interfaces/cart";

describe("cartAppReducer", () => {
    const mockProduct: CartItem[] = [{
        id: 1,
        title: "Camisa de la Vinotinto",
        quantity: 2,
        price: 35,
        stock: 5,
        thumbnail: "vinotinto-con-fe.jpg",
    },
    {
        id: 2,
        title: "Camisa de la seleccion peruana",
        quantity: 3,
        price: 35,
        stock: 5,
        thumbnail: "arriba-Peru.jpg",
    }];

    const initialState = {
        ...cartInitialState,
        items: mockProduct,
    };

    it("Should not change products that do not match the ID when adding quantity", () => {
        const actionAddExistingProduct = {
            type: CartAppActions.CartAddProduct,
            payload: {
                ...mockProduct[0],
                quantity: 2,
            },
        };

        const result = cartAppReducer(initialState, actionAddExistingProduct);

        const updatedProduct = result.items.find((item) => item.id === 1);
        expect(updatedProduct).toEqual({
            ...mockProduct[0],
            quantity: 3
        });

        const unchangedProduct = result.items.find((item) => item.id === 2);
        expect(unchangedProduct).toEqual(mockProduct[1]);

        expect(result.items.length).toBe(2);
        expect(result.getCartQuantity()).toBe(6);
        expect(result.getCartPrice()).toBe(210);
    });

    it("Should not change products that do not match the ID when reducing quantity", () => {
        const action = {
            type: CartAppActions.CartRemoveProduct,
            payload: 1,
        };

        const result = cartAppReducer(initialState, action);

        const unchangedProduct = result.items.find((item) => item.id === 2);
        expect(unchangedProduct).toEqual(mockProduct[1]);

        const modifiedProduct = result.items.find((item) => item.id === 1);
        expect(modifiedProduct).toEqual({
            id: mockProduct[0].id,
            title: mockProduct[0].title,
            quantity: 1,
            price: mockProduct[0].price,
            stock: mockProduct[0].stock,
            thumbnail: mockProduct[0].thumbnail,
        });

        expect(result.items.length).toBe(2);
        expect(result.items[0].quantity).toBe(1);
        expect(result.getCartQuantity()).toBe(4);
        expect(result.getCartPrice()).toBe(140); 
    });

    it("Should remove a product from the cart when quantity reaches 0", () => {
        const stateWithProduct = {
            ...cartInitialState,
            items: [
                {
                    ...mockProduct[0],
                    quantity: 1,
                },
            ],
        };

        const result = cartAppReducer(stateWithProduct, {
            type: CartAppActions.CartRemoveProduct,
            payload: mockProduct[0].id,
        });

        expect(result.items).toHaveLength(0); 
        expect(result.getCartQuantity()).toBe(0);
        expect(result.getCartPrice()).toBe(0);
    });

    it("Should delete a product from the cart regardless of quantity", () => {
        const result = cartAppReducer(initialState, {
            type: CartAppActions.CartDeleteProduct,
            payload: mockProduct[0].id,
        });

        expect(result.items).toHaveLength(1); 
        expect(result.getCartQuantity()).toBe(3); 
        expect(result.getCartPrice()).toBe(105);
    });

    it("Should clear all products from the cart", () => {
        const result = cartAppReducer(initialState, {
            type: CartAppActions.CartDeleteAllProducts,
        });

        expect(result.items).toHaveLength(0); 
        expect(result.getCartQuantity()).toBe(0); 
        expect(result.getCartPrice()).toBe(0); 
    });

    it("should return the same state if CartRemoveProduct is dispatched for a non-existent product", () => {
        const action = {
            type: CartAppActions.CartRemoveProduct,
            payload: 99,
        };

        const newState = cartAppReducer(cartInitialState, action);
        expect(newState).toEqual(cartInitialState);
    });

    it("should throw an error for an unknown action", () => {
        const unknownAction = { type: "UNKNOWN_ACTION" as any };
        expect(() => cartAppReducer(cartInitialState, unknownAction)).toThrowError('Unhandled action type: UNKNOWN_ACTION');
    });
});
