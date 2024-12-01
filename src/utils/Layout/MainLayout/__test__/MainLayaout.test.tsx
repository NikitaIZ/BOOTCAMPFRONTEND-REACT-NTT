import { MemoryRouter, Route, Routes } from "react-router-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import MainLayout from "../MainLayout";

const renderComponent = async (): Promise<void> => {
    await render(
        <MemoryRouter initialEntries={["/"]}>
            <Routes>
                <Route
                    path="/"
                    element={
                        <MainLayout>
                            <div>Initial Content</div>
                        </MainLayout>
                    }
                />
                <Route path="/cart" element={<div>Cart Page</div>} />
            </Routes>
        </MemoryRouter>
    );
};

describe("MainLayout component", () => {

    let cartButton: HTMLElement;

    beforeEach(async () => {
        await renderComponent();
        cartButton = screen.getByRole("link", { name: "cart" });
    });

    // Test para verificar que los componentes existen
    it("Should render Header, Footer and CartButton", () => {
        expect(screen.getByRole("banner")).toBeInTheDocument();
        expect(screen.getByRole("contentinfo")).toBeInTheDocument();
        expect(cartButton).toBeInTheDocument();
    });

    // Test para la navegación al hacer clic en el CartButton
    it("Should send to Cart page when clicking the CartButton", () => {
        fireEvent.click(cartButton);
        expect(screen.getByText("Cart Page")).toBeInTheDocument();
    });
});