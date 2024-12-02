import { MemoryRouter } from "react-router-dom";
import { render, RenderResult, act, screen } from "@testing-library/react";
import { ModuleRoutes } from "@/app/routes/routes";
import { GlobalSearchAppProvider } from "@/app/context/search";
import { GlobalPaginationAppProvider } from "@/app/context/pagination";
import { GlobalCartAppProvider } from "@/app/context/cart";
import { productsRequest } from "@/app/proxy/products-request";
import { productsResponseMock } from "@/app/proxy/__mocks__/products";
import App from "./App";

jest.mock("@/app/proxy/products-request", () => ({
    ...jest.requireActual("@/app/proxy/products-request"),
    getProducts: jest.fn(),
}));

const renderComponent = async (initialEntries = [ModuleRoutes.Init]): Promise<RenderResult> => {
    let component: RenderResult;

    await act(async () => {
        component = render(
            <GlobalSearchAppProvider>
                <GlobalPaginationAppProvider>
                    <GlobalCartAppProvider>
                        <MemoryRouter initialEntries={initialEntries}>
                            <App />
                        </MemoryRouter>
                    </GlobalCartAppProvider>
                </GlobalPaginationAppProvider>
            </GlobalSearchAppProvider>
        );
    });

    return component!;
};

describe("App Component", () => {
    beforeEach(() => {
        jest.clearAllMocks();

        jest.spyOn(productsRequest, "getProducts").mockResolvedValue({
            products: productsResponseMock.products,
            totalPages: 1,
        });
    });

    it("Should render the Init page", async () => {
        await renderComponent([ModuleRoutes.Init]);

        expect(screen.getByText("Essence Mascara Lash Princess")).toBeInTheDocument();
        expect(screen.getByText("Eyeshadow Palette with Mirror")).toBeInTheDocument();
    });
});
