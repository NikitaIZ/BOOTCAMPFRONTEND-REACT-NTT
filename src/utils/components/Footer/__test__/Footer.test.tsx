import { render, RenderResult, act, screen } from "@testing-library/react";
import Footer from "../Footer";

jest.mock("../../../assets/facebook.svg", () => "facebook.svg");
jest.mock("../../../assets/instagram.svg", () => "instagram.svg");

const renderComponent = async (): Promise<RenderResult> => {
    const component = await act(async () => render(<Footer />));
    return component;
};

describe("Footer component", () => {
    it("Should render footer", async () => {
        await renderComponent();

        expect(screen.getByText("Follow us on our social networks")).toBeInTheDocument();

        const facebookLink = screen.getByRole("link", { name: 'facebook' });
        expect(facebookLink).toHaveAttribute("href", "https://www.facebook.com");

        const instagramLink = screen.getByRole("link", { name: 'instagram' });
        expect(instagramLink).toHaveAttribute("href", "https://www.instagram.com");

        expect(screen.getByText("© 2024 My Super Market. All rights reserved.")).toBeInTheDocument();

        const facebookIcon = screen.getByAltText("facebook");
        expect(facebookIcon).toBeInTheDocument();

        const instagramIcon = screen.getByAltText("instagram");
        expect(instagramIcon).toBeInTheDocument();
    });
});
