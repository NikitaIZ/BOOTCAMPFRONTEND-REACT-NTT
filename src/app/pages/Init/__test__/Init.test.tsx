import { ReactElement } from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { GlobalSearchAppProvider } from "@/app/context/search";
import { GlobalPaginationAppProvider } from "@/app/context/pagination";
import { GlobalCartAppProvider } from "@/app/context/cart";
import { productsRequest } from "@/app/proxy/products-request";
import Init from "../Init";

jest.mock("@/app/proxy/products-request", () => ({
    productsRequest: {
        getProducts: jest.fn(),
    },
}));

const renderWithProviders = (ui: ReactElement) => {
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

describe("Init Component", () => {
    it("should display 'Loading Products...' when products are being fetched", () => {
        (productsRequest.getProducts as jest.Mock).mockResolvedValueOnce({ products: [], totalPages: 1 });

        renderWithProviders(<Init />);

        expect(screen.getByText("Loading Products...")).toBeInTheDocument();
    });

    it("should display 'No products found.' if no products are returned", async () => {
        (productsRequest.getProducts as jest.Mock).mockResolvedValueOnce({ products: [], totalPages: 1 });

        renderWithProviders(<Init />);

        await waitFor(() => screen.getByText("No products found."));

        expect(screen.getByText("No products found.")).toBeInTheDocument();
    });

    it("should display products when data is fetched", async () => {
        const mockProducts = [
            {
                id: 1,
                title: "Hollow Knight",
                description: "El mejor metroidvania de todos los tiempos",
                category: "Videojuegos",
                price: 100,
                discountPercentage: 10,
                images: ["elcaballerito.jpg"],
                thumbnail: "elcaballerito.jpg",
                stock: 50,
                tags: ["metroidvania", "aventura"],
            },
            {
                id: 2,
                title: "El planeta del tesoro",
                description: "Pelicula infravalorada",
                category: "Peliculas",
                price: 50,
                discountPercentage: 15,
                images: ["el-planeta-del-tesoro.jpg"],
                thumbnail: "el-planeta-del-tesoro.jpg",
                stock: 30,
                tags: ["pelicula", "aventura"],
            },
        ];

        (productsRequest.getProducts as jest.Mock).mockResolvedValueOnce({ products: mockProducts, totalPages: 2 });

        renderWithProviders(<Init />);

        await waitFor(() => screen.getByText("Hollow Knight"));

        expect(screen.getByText("Hollow Knight")).toBeInTheDocument();
        expect(screen.getByText("El planeta del tesoro")).toBeInTheDocument();
    });
});
