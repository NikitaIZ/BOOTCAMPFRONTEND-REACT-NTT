import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter, useNavigate } from "react-router-dom";
import { authRequest } from "@/app/proxy/login-request";
import LoginCard from "../LoginCard";

jest.mock("@/app/proxy/login-request", () => ({
    authRequest: {
        authUser: jest.fn(),
    },
}));

jest.mock("@/app/context/user", () => ({
    useGlobalUserAppDispatch: jest.fn().mockReturnValue(jest.fn()),
}));

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: jest.fn(),
}));

describe("LoginCard Component", () => {
    const mockNavigate = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
        (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    });

    it("should render the login form correctly", () => {
        render(
            <BrowserRouter>
                <LoginCard />
            </BrowserRouter>
        );

        expect(screen.getByPlaceholderText(/username/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
    });

    it("should show error message when fields are empty", async () => {
        render(
            <BrowserRouter>
                <LoginCard />
            </BrowserRouter>
        );

        fireEvent.click(screen.getByRole("button", { name: /login/i }));

        await waitFor(() => {
            expect(screen.getByText(/please fill out all fields/i)).toBeInTheDocument();
        });
    });

    it("should call authRequest.authUser on valid credentials", async () => {
        const fakeResponse = { username: "emilys", password: "emilyspass" };
        (authRequest.authUser as jest.Mock).mockResolvedValue(fakeResponse);

        render(
            <BrowserRouter>
                <LoginCard />
            </BrowserRouter>
        );

        fireEvent.change(screen.getByPlaceholderText(/username/i), {
            target: { value: "emilys" },
        });
        fireEvent.change(screen.getByPlaceholderText(/password/i), {
            target: { value: "emilyspass" },
        });

        fireEvent.click(screen.getByRole("button", { name: /login/i }));

        await waitFor(() => {
            expect(authRequest.authUser).toHaveBeenCalledWith({
                username: "emilys",
                password: "emilyspass",
            });
            expect(mockNavigate).toHaveBeenCalledWith("/");
        });
    });

    it("should show error message when invalid credentials are entered", async () => {
        (authRequest.authUser as jest.Mock).mockRejectedValue(new Error("Invalid credentials"));

        render(
            <BrowserRouter>
                <LoginCard />
            </BrowserRouter>
        );

        fireEvent.change(screen.getByPlaceholderText(/username/i), {
            target: { value: "YaNoPuedoMasSam" },
        });
        fireEvent.change(screen.getByPlaceholderText(/password/i), {
            target: { value: "RecistaSeñorFrodo" },
        });

        fireEvent.click(screen.getByRole("button", { name: /login/i }));

        await waitFor(() => {
            expect(screen.getByText(/invalid username or password/i)).toBeInTheDocument();
        });
    });

    it("should handle email submission in password recovery", async () => {
        render(
            <BrowserRouter>
                <LoginCard />
            </BrowserRouter>
        );

        fireEvent.click(screen.getByText(/forgot password\?/i));

        fireEvent.change(screen.getByPlaceholderText(/enter your email/i), {
            target: { value: "test@example.com" },
        });

        fireEvent.click(screen.getByRole("button", { name: /send/i }));

        await waitFor(() => {
            expect(screen.getByText(/your password recovery email has been sent successfully/i)).toBeInTheDocument();
        });
    });

    it("should show an error message when email is invalid or empty", async () => {
        render(
            <BrowserRouter>
                <LoginCard />
            </BrowserRouter>
        );

        fireEvent.click(screen.getByText(/forgot password\?/i));

        fireEvent.click(screen.getByRole("button", { name: /send/i }));

        await waitFor(() => {
            expect(screen.getByText(/Please fill out this field./i)).toBeInTheDocument();
        });

        fireEvent.change(screen.getByPlaceholderText(/enter your email/i), {
            target: { value: "invalidEmail" },
        });

        fireEvent.click(screen.getByRole("button", { name: /send/i }));

        await waitFor(() => {
            expect(screen.getByText(/please enter a valid email address/i)).toBeInTheDocument();
        });
    });

    it("should close the modal when 'Cancel' button is clicked", async () => {
        render(
            <BrowserRouter>
                <LoginCard />
            </BrowserRouter>
        );
    
        fireEvent.click(screen.getByText(/forgot password\?/i)); 
    
        expect(screen.getByText(/password recovery/i)).toBeInTheDocument();
    
        fireEvent.click(screen.getByText(/cancel/i));
    
        await waitFor(() => {
            expect(screen.queryByText(/password recovery/i)).not.toBeInTheDocument();
        });
    });    
});
