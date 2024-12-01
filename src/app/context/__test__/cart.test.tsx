import { render, screen, fireEvent } from "@testing-library/react";
import { GlobalCartAppProvider, useGlobalCartAppState, useGlobalCartAppDispatch } from "../cart";
import { CartAppActions } from "@/app/domain/types/app-cart";

beforeAll(() => {
    Storage.prototype.setItem = jest.fn();
    Storage.prototype.getItem = jest.fn();
    Storage.prototype.removeItem = jest.fn();
});

const renderWithCartProvider = (ui: React.ReactElement) => {
    return render(<GlobalCartAppProvider>{ui}</GlobalCartAppProvider>);
};

describe("GlobalCartAppProvider", () => {
    it("should provide the initial cart state", () => {
        const TestComponent = () => {
            const state = useGlobalCartAppState();
            return (
                <div>
                    <span data-testid="cart-quantity">{state.getCartQuantity()}</span>
                    <span data-testid="cart-price">{state.getCartPrice()}</span>
                </div>
            );
        };

        renderWithCartProvider(<TestComponent />);

        expect(screen.getByTestId("cart-quantity")).toHaveTextContent("0");
        expect(screen.getByTestId("cart-price")).toHaveTextContent("0");
    });

    it("should correctly calculate cart quantity and price", () => {
        const TestComponent = () => {
            const dispatch = useGlobalCartAppDispatch();
            const state = useGlobalCartAppState();

            const addProduct = () => {
                dispatch({
                    type: CartAppActions.CartAddProduct,
                    payload: { id: 1, quantity: 1, price: 10, total: 10, title: "Test Product" },
                });
            };

            return (
                <div>
                    <button onClick={addProduct}>Add Product</button>
                    <span data-testid="cart-quantity">{state.getCartQuantity()}</span>
                    <span data-testid="cart-price">{state.getCartPrice()}</span>
                </div>
            );
        };

        renderWithCartProvider(<TestComponent />);

        fireEvent.click(screen.getByText("Add Product"));
        fireEvent.click(screen.getByText("Add Product"));

        expect(screen.getByTestId("cart-quantity")).toHaveTextContent("2");
        expect(screen.getByTestId("cart-price")).toHaveTextContent("20");
    });

    it("should throw error if used outside of provider", () => {
        const TestComponent = () => {
            useGlobalCartAppState();
            return null;
        };

        expect(() => render(<TestComponent />)).toThrow(
            "useGlobalCartAppState must be used within CartAppStateContext"
        );
    });

    it("should throw error if used outside of CartAppDispatchContext", () => {
        const TestComponent = () => {
            useGlobalCartAppDispatch();
            return null;
        };

        expect(() => render(<TestComponent />)).toThrow(
            "useGlobalCartAppDispatch must be used within CartAppDispatchContext"
        );
    });    
});
