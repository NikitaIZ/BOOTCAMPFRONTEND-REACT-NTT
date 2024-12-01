import { render, screen, waitFor } from "@testing-library/react";
import { GlobalSearchAppProvider } from "@/app/context/search";
import { GlobalPaginationAppProvider } from "@/app/context/pagination";
import { GlobalCartAppProvider } from "@/app/context/cart";
import { productsRequest } from "@/app/proxy/products-request";
import Category from "../Category";

jest.mock("@/app/proxy/products-request", () => ({
    productsRequest: {
        getProducts: jest.fn(),
    },
}));

const renderWithProviders = (ui: React.ReactElement) => {
    return render(
        <GlobalSearchAppProvider>
            <GlobalPaginationAppProvider>
                <GlobalCartAppProvider>
                    {ui}
                </GlobalCartAppProvider>
            </GlobalPaginationAppProvider>
        </GlobalSearchAppProvider>
    );
};

describe("Category Component", () => {
    it("should display 'Loading Products...' when products are being fetched", () => {
        (productsRequest.getProducts as jest.Mock).mockResolvedValueOnce({ products: [], totalPages: 1 });

        renderWithProviders(<Category />);

        expect(screen.getByText("Loading Products...")).toBeInTheDocument();
    });

    it("should display 'No products found.' if no products are returned", async () => {
        (productsRequest.getProducts as jest.Mock).mockResolvedValueOnce({ products: [], totalPages: 1 });

        renderWithProviders(<Category />);

        await waitFor(() => screen.getByText("No products found."));

        expect(screen.getByText("No products found.")).toBeInTheDocument();
    });

    it("should display products when data is fetched", async () => {
        const mockProducts = [
            {
                id: 1,
                title: "El fierro golpeador de parejas felices",
                description: "Cansado de ver parejas felices mientras te la pasas solo?",
                category: "German",
                price: 100,
                discountPercentage: 10,
                images: ["fierro.jpg"],
                thumbnail: "fierro.jpg",
                stock: 50,
                tags: ["german", "foreveralone"],
            },
            {
                id: 2,
                title: "La zapatilla kamikaze",
                description: "Es una zapatilla...",
                category: "German",
                price: 200,
                discountPercentage: 15,
                images: ["zapatilla.jpg"],
                thumbnail: "zapatilla.jpg",
                stock: 30,
                tags: ["zapatilla", "nomasburlas"],
            },
        ];

        (productsRequest.getProducts as jest.Mock).mockResolvedValueOnce({ products: mockProducts, totalPages: 2 });

        renderWithProviders(<Category />);

        await waitFor(() => screen.getByText("El fierro golpeador de parejas felices"));

        expect(screen.getByText("El fierro golpeador de parejas felices")).toBeInTheDocument();
        expect(screen.getByText("La zapatilla kamikaze")).toBeInTheDocument();
    });
});
