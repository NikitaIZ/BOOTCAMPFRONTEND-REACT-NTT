import { MemoryRouter, Route, Routes, useNavigate } from "react-router-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { categoriesRequest } from "@/app/proxy/categories-request";
import { useGlobalUserAppState, useGlobalUserAppDispatch } from "@/app/context/user";
import { useGlobalSearchAppState } from "@/app/context/search";
import { UserAppActions } from "@/app/domain/types/app-user";
import Header from "../Header";
import Login from "@/app/pages/Login/Login";

jest.mock("@/app/context/search", () => ({
    useGlobalSearchAppState: jest.fn(),
}));

jest.mock("@/app/proxy/categories-request", () => ({
    categoriesRequest: {
        getCategories: jest.fn(),
    },
}));

jest.mock("@/app/context/user", () => ({
    ...jest.requireActual("@/app/context/user"),
    useGlobalUserAppState: jest.fn(),
    useGlobalUserAppDispatch: jest.fn(),
}));

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: jest.fn(),
}));

const renderComponent = async (): Promise<void> => {
    await render(
        <MemoryRouter initialEntries={["/"]}>
            <Routes>
                <Route path="/" element={<Header />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </MemoryRouter>
    );
};

describe("Header Component", () => {
    const mockSetSearchTerm = jest.fn();
    const mockDispatch = jest.fn();
    const mockNavigate = jest.fn();
    const mockUserState = { user: { isLoggedIn: true, username: "testUser" } };

    beforeEach(() => {
        (useGlobalSearchAppState as jest.Mock).mockReturnValue({
            searchTerm: "",
            setSearchTerm: mockSetSearchTerm,
        });
        (useGlobalUserAppState as jest.Mock).mockReturnValue(mockUserState);
        (useGlobalUserAppDispatch as jest.Mock).mockReturnValue(mockDispatch);
        (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
        jest.clearAllMocks();
    });

    it("Should render logo, search input, and user info", async () => {
        await renderComponent();

        expect(screen.getByAltText("Super Market logo")).toBeInTheDocument();

        expect(screen.getByPlaceholderText("Search products...")).toBeInTheDocument();

        expect(screen.getByText("Welcome:")).toBeInTheDocument();
        expect(screen.getByText("testUser")).toBeInTheDocument();
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

    it("Should handle user logout", async () => {
        await renderComponent();

        const logoutButton = screen.getByText("Logout");
        expect(logoutButton).toBeInTheDocument();

        fireEvent.click(logoutButton);

        expect(mockDispatch).toHaveBeenCalledWith({
            type: UserAppActions.Userlogout,
            payload: [],
        });

        expect(mockNavigate).toHaveBeenCalledWith("/login");
    });
});
