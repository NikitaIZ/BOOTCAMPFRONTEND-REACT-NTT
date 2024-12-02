import { render, screen, fireEvent } from "@testing-library/react";
import { GlobalUserAppProvider, useGlobalUserAppState, useGlobalUserAppDispatch } from "../user";
import { UserAppActions } from "@/app/domain/types/app-user";

beforeAll(() => {
    Storage.prototype.setItem = jest.fn();
    Storage.prototype.getItem = jest.fn();
    Storage.prototype.removeItem = jest.fn();
});

const renderWithUserAppProvider = (ui: React.ReactElement) => {
    return render(<GlobalUserAppProvider>{ui}</GlobalUserAppProvider>);
};

describe("GlobalUserAppProvider", () => {
    it("should provide the initial user state", () => {
        const TestComponent = () => {
            const state = useGlobalUserAppState();
            return (
                <div>
                    <span data-testid="user-name">{state.user.username}</span>
                    <span data-testid="user-email">{state.user.email}</span>
                </div>
            );
        };

        renderWithUserAppProvider(<TestComponent />);

        expect(screen.getByTestId("user-name")).toHaveTextContent("");
        expect(screen.getByTestId("user-email")).toHaveTextContent("");
    });

    it("should correctly dispatch an action to update user state", () => {
        const TestComponent = () => {
            const dispatch = useGlobalUserAppDispatch();
            const state = useGlobalUserAppState();

            const updateUser = () => {
                dispatch({
                    type: UserAppActions.UserLogin,
                    payload: { username: "emilys", email: "emilys@example.com" },
                });
            };

            return (
                <div>
                    <button onClick={updateUser}>Update User</button>
                    <span data-testid="user-name">{state.user.username}</span>
                    <span data-testid="user-email">{state.user.email}</span>
                </div>
            );
        };

        renderWithUserAppProvider(<TestComponent />);

        fireEvent.click(screen.getByText("Update User"));

        expect(screen.getByTestId("user-name")).toHaveTextContent("emilys");
        expect(screen.getByTestId("user-email")).toHaveTextContent("emilys@example.com");
    });

    it("should throw error if used outside of UserAppStateContext", () => {
        const TestComponent = () => {
            useGlobalUserAppState();
            return null;
        };

        expect(() => render(<TestComponent />)).toThrow("useGlobalUserAppState must be used within UserAppStateContext");
    });

    it("should throw error if used outside of UserAppDispatchContext", () => {
        const TestComponent = () => {
            useGlobalUserAppDispatch();
            return null;
        };

        expect(() => render(<TestComponent />)).toThrow("useGlobalUserAppDispatch must be used within UserAppDispatchContext");
    });
});
