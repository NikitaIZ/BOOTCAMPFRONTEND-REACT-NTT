import { render, screen, act } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { ModuleRoutes } from "@/app/routes/routes";
import { GlobalSearchAppProvider } from "@/app/context/search";
import { GlobalPaginationAppProvider } from "@/app/context/pagination";
import { GlobalCartAppProvider } from "@/app/context/cart";
import { GlobalUserAppProvider, useGlobalUserAppState } from "@/app/context/user";
import { productsRequest } from "@/app/proxy/products-request";
import { productsResponseMock } from "@/app/proxy/__mocks__/products";
import App from "./App";

jest.mock("@/app/proxy/products-request", () => ({
    ...jest.requireActual("@/app/proxy/products-request"),
    getProducts: jest.fn(),
}));

jest.mock("@/app/context/user", () => ({
    ...jest.requireActual("@/app/context/user"),
    useGlobalUserAppState: jest.fn(),
}));

const renderComponent = async (initialEntries = [ModuleRoutes.Init], userState = { isLoggedIn: true }) => {
    (useGlobalUserAppState as jest.Mock).mockReturnValue({ user: userState });

    let component;

    await act(async () => {
        component = render(
            <MemoryRouter initialEntries={initialEntries}>
                <GlobalUserAppProvider>
                    <GlobalSearchAppProvider>
                        <GlobalPaginationAppProvider>
                            <GlobalCartAppProvider>
                                <App />
                            </GlobalCartAppProvider>
                        </GlobalPaginationAppProvider>
                    </GlobalSearchAppProvider>
                </GlobalUserAppProvider>
            </MemoryRouter>
        );
    });

    return component;
};

describe("App Component", () => {
    beforeEach(() => {
        jest.clearAllMocks();

        jest.spyOn(productsRequest, "getProducts").mockResolvedValue({
            products: productsResponseMock.products,
            totalPages: 1,
        });
    });

    it("Should render the Init page login and logout", async () => {
        await renderComponent([ModuleRoutes.Init], { isLoggedIn: true });

        expect(screen.getByText("Essence Mascara Lash Princess")).toBeInTheDocument();
        expect(screen.getByText("Eyeshadow Palette with Mirror")).toBeInTheDocument();

        await renderComponent([ModuleRoutes.Init], { isLoggedIn: false });

        expect(screen.getByText("Forgot password?")).toBeInTheDocument();
    });
});
