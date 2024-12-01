import { render, screen, fireEvent } from "@testing-library/react";
import { GlobalPaginationAppProvider, useGlobalPaginationAppState, useGlobalPaginationAppDispatch } from "../pagination";
import { paginationInitialState } from "@/app/reducer/pagination";
import { PaginationAppActions } from "@/app/domain/types/app-pagination";

jest.mock("@/app/hooks/useLocalStorage", () => ({
    useLocalStorage: jest.fn().mockReturnValue({
        storedValue: paginationInitialState,
        setStoredValue: jest.fn(),
    }),
}));

describe("GlobalPaginationAppProvider", () => {
    it("should provide the initial pagination state", () => {
        const TestComponent = () => {
            const state = useGlobalPaginationAppState();
            return (
                <div>
                    <span data-testid="pagination-state">{JSON.stringify(state)}</span>
                </div>
            );
        };

        render(
            <GlobalPaginationAppProvider>
                <TestComponent />
            </GlobalPaginationAppProvider>
        );

        expect(screen.getByTestId("pagination-state")).toHaveTextContent(JSON.stringify(paginationInitialState.paginations));
    });

    it("should dispatch an action and update the pagination state", () => {
        const TestComponent = () => {
            const dispatch = useGlobalPaginationAppDispatch();

            const handlePageChange = () => {
                dispatch({
                    type: PaginationAppActions.PaginationCurrent,
                    payload: { page: 2 },
                });
            };

            return (
                <div>
                    <button onClick={handlePageChange}>Change Page</button>
                </div>
            );
        };

        render(
            <GlobalPaginationAppProvider>
                <TestComponent />
            </GlobalPaginationAppProvider>
        );

        fireEvent.click(screen.getByText("Change Page"));
    });

    it("should throw error if used outside of PaginationAppStateContext", () => {
        const TestComponent = () => {
            useGlobalPaginationAppState();
            return null;
        };

        expect(() => render(<TestComponent />)).toThrow("useGlobalPaginationAppState must be used within a PaginationAppStateContext");
    });

    it("should throw error if used outside of PaginationAppDispatchContext", () => {
        const TestComponent = () => {
            useGlobalPaginationAppDispatch();
            return null;
        };

        expect(() => render(<TestComponent />)).toThrow("useGlobalPaginationAppDispatch must be used within a PaginationAppDispatchContext");
    });
});
