import { render, screen, fireEvent } from "@testing-library/react";
import { GlobalSearchAppProvider, useGlobalSearchAppState, useGlobalSearchAppDispatch } from "../search";

describe("GlobalSearchAppProvider", () => {

    it("should provide the initial search term", () => {
        const TestComponent = () => {
            const { searchTerm } = useGlobalSearchAppState();
            return <span data-testid="search-term">{searchTerm}</span>;
        };

        render(
            <GlobalSearchAppProvider>
                <TestComponent />
            </GlobalSearchAppProvider>
        );

        expect(screen.getByTestId("search-term")).toHaveTextContent("");
    });

    it("should update the search term when input value is changed", () => {
        const TestComponent = () => {
            const dispatch = useGlobalSearchAppDispatch();
            const { searchTerm } = useGlobalSearchAppState();

            return (
                <div>
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => dispatch(e.target.value)}
                        data-testid="search-input"
                    />
                    <span data-testid="search-term">{searchTerm}</span>
                </div>
            );
        };

        render(
            <GlobalSearchAppProvider>
                <TestComponent />
            </GlobalSearchAppProvider>
        );

        fireEvent.change(screen.getByTestId("search-input"), { target: { value: "new search term" } });

        expect(screen.getByTestId("search-term")).toHaveTextContent("new search term");
    });

    it("should throw error if used outside of SearchAppStateContext", () => {
        const TestComponent = () => {
            useGlobalSearchAppState();
            return null;
        };

        expect(() => render(<TestComponent />)).toThrow("useGlobalSearchAppState must be used within SearchAppStateContext");
    });

    it("should throw error if used outside of SearchDispatchContext", () => {
        const TestComponent = () => {
            useGlobalSearchAppDispatch();
            return null;
        };

        expect(() => render(<TestComponent />)).toThrow("useGlobalSearchAppDispatch must be used within SearchDispatchContext");
    });
});
