import { render, screen, fireEvent } from "@testing-library/react";
import { GlobalClientAppProvider, useGlobalClientAppState, useGlobalClientAppDispatch } from "../client";
import { clientInitialState } from "@/app/reducer/client";
import { ClientAppActions } from "@/app/domain/types/app-client";

describe("GlobalClientAppProvider", () => {
    it("should provide the initial client state", () => {
        const TestComponent = () => {
            const state = useGlobalClientAppState();
            return (
                <div>
                    <span data-testid="client-state">{JSON.stringify(state)}</span>
                </div>
            );
        };

        render(
            <GlobalClientAppProvider>
                <TestComponent />
            </GlobalClientAppProvider>
        );

        expect(screen.getByTestId("client-state")).toHaveTextContent(JSON.stringify(clientInitialState));
    });

    it("should return dispatch function when used within ClientAppDispatchContext", () => {
        const TestComponent = () => {
            const dispatch = useGlobalClientAppDispatch();

            const handleDispatch = () => {
                dispatch({ type: ClientAppActions.ClientSave, payload: { name: "John" } });
            };

            return (
                <div>
                    <button onClick={handleDispatch}>Update Client Info</button>
                </div>
            );
        };

        render(
            <GlobalClientAppProvider>
                <TestComponent />
            </GlobalClientAppProvider>
        );

        fireEvent.click(screen.getByText("Update Client Info"));
    });

    it("should throw error if used outside of ClientAppStateContext", () => {
        const TestComponent = () => {
            useGlobalClientAppState();
            return null;
        };

        expect(() => render(<TestComponent />)).toThrow("useGlobalClientAppState must be used within ClientAppStateContext");
    });

    it("should throw error if used outside of ClientAppDispatchContext", () => {
        const TestComponent = () => {
            useGlobalClientAppDispatch();
            return null;
        };

        expect(() => render(<TestComponent />)).toThrow("useGlobalClientAppDispatch must be used within ClientAppDispatchContext");
    });
});
