import { MemoryRouter, Route, Routes } from "react-router-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { categoriesRequest } from "@/app/proxy/categories-request";
import { useGlobalSearchAppState } from "@/app/context/search";
import Header from "../Header";

jest.mock("@/app/context/search", () => ({
    useGlobalSearchAppState: jest.fn(),
}));

jest.mock("@/app/proxy/categories-request", () => ({
    categoriesRequest: {
        getCategories: jest.fn(),
    },
}));

const renderComponent = async (): Promise<void> => {
    await render(
        <MemoryRouter initialEntries={["/"]}>
            <Routes>
                <Route path="/" element={<Header />} />
            </Routes>
        </MemoryRouter>
    );
};

describe("Header Component", () => {
    const mockSetSearchTerm = jest.fn();

    beforeEach(() => {
        (useGlobalSearchAppState as jest.Mock).mockReturnValue({
            searchTerm: "",
            setSearchTerm: mockSetSearchTerm,
        });
        jest.clearAllMocks();
    });

    it("Should render logo, search input, and login button", async () => {
        await renderComponent();

        expect(screen.getByAltText("Super Market logo")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Search products...")).toBeInTheDocument();
        expect(screen.getByText("Login")).toBeInTheDocument();
    });

    it("Should update search term on input change", async () => {
        await renderComponent();

        const searchInput = screen.getByPlaceholderText("Search products...");

        fireEvent.change(searchInput, { target: { value: "Natuchips" } });

        expect(searchInput).toHaveValue("Natuchips");
        expect(mockSetSearchTerm).toHaveBeenCalledWith("Natuchips");
    });

    it("Should fetch and display categories", async () => {
        const mockCategories = [
            { slug: "Dulces", name: "Dulces" },
            { slug: "Salado", name: "Salado" },
        ];

        (categoriesRequest.getCategories as jest.Mock).mockResolvedValue(mockCategories);

        await renderComponent();

        await waitFor(() => {
            expect(screen.getByText("Dulces")).toBeInTheDocument();
            expect(screen.getByText("Salado")).toBeInTheDocument();
        });
    });

    it("Should handle category request failure gracefully", async () => {
        (categoriesRequest.getCategories as jest.Mock).mockRejectedValue(new Error("Failed to fetch"));

        await renderComponent();

        expect(screen.getByText("Loading categories...")).toBeInTheDocument();
    });
});
