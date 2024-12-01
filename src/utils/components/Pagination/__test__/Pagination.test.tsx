import { render, screen, fireEvent } from "@testing-library/react";
import { useGlobalPaginationAppState, useGlobalPaginationAppDispatch } from "@/app/context/pagination";
import { PaginationAppActions } from "@/app/domain/types/app-pagination";
import Pagination from "../Pagination";

jest.mock("@/app/context/pagination", () => ({
    useGlobalPaginationAppState: jest.fn(),
    useGlobalPaginationAppDispatch: jest.fn(),
}));

describe("Pagination Component", () => {
    const mockDispatch = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
        (useGlobalPaginationAppState as jest.Mock).mockReturnValue({
            currentPage: 1,
            totalPages: 5,
        });
        (useGlobalPaginationAppDispatch as jest.Mock).mockReturnValue(mockDispatch);
    });

    it("should render the correct number of page buttons", () => {
        render(<Pagination />);

        const pageButtons = screen.getAllByRole("button", { name: /\d+/ });
        expect(pageButtons).toHaveLength(5);
        expect(pageButtons[0]).toHaveTextContent("1");
        expect(pageButtons[4]).toHaveTextContent("5");
    });

    it("should disable 'Previous' button on the first page", () => {
        render(<Pagination />);

        const previousButton = screen.getByRole("button", { name: "<" });
        expect(previousButton).toBeDisabled();
    });

    it("should disable 'Next' button on the last page", () => {
        (useGlobalPaginationAppState as jest.Mock).mockReturnValue({
            currentPage: 5,
            totalPages: 5,
        });

        render(<Pagination />);

        const nextButton = screen.getByRole("button", { name: ">" });
        expect(nextButton).toBeDisabled();
    });

    it("should call dispatch with correct action when 'Previous' is clicked", () => {
        (useGlobalPaginationAppState as jest.Mock).mockReturnValue({
            currentPage: 2,
            totalPages: 5,
        });

        render(<Pagination />);

        const previousButton = screen.getByRole("button", { name: "<" });
        fireEvent.click(previousButton);

        expect(mockDispatch).toHaveBeenCalledWith({
            type: PaginationAppActions.PaginationCurrent,
            payload: 1,
        });
    });

    it("should call dispatch with correct action when 'Next' is clicked", () => {
        render(<Pagination />);

        const nextButton = screen.getByRole("button", { name: ">" });
        fireEvent.click(nextButton);

        expect(mockDispatch).toHaveBeenCalledWith({
            type: PaginationAppActions.PaginationCurrent,
            payload: 2,
        });
    });

    it("should call dispatch with correct action when a page button is clicked", () => {
        render(<Pagination />);

        const pageButton = screen.getByRole("button", { name: "3" });
        fireEvent.click(pageButton);

        expect(mockDispatch).toHaveBeenCalledWith({
            type: PaginationAppActions.PaginationCurrent,
            payload: 3,
        });
    });

    it("should highlight the current page button", () => {
        (useGlobalPaginationAppState as jest.Mock).mockReturnValue({
            currentPage: 3,
            totalPages: 5,
        });

        render(<Pagination />);

        const activeButton = screen.getByRole("button", { name: "3" });
        expect(activeButton).toHaveClass("active");
    });
});
