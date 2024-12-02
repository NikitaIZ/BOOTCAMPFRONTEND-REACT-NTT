import { render, act, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { useGlobalUserAppState } from "@/app/context/user";
import { GlobalUserAppProvider } from "@/app/context/user";
import ProtectedLoginRoute from "@/app/routes/Protected/LoginRoute";

jest.mock("@/app/context/user", () => ({
    ...jest.requireActual("@/app/context/user"),
    useGlobalUserAppState: jest.fn(),
}));

describe("ProtectedLoginRoute", () => {
    it("Should redirect to home page if the user is logged in", async () => {
        (useGlobalUserAppState as jest.Mock).mockReturnValue({
            user: { isLoggedIn: true },
        });

        await act(async () => {
            render(
                <MemoryRouter initialEntries={["/login"]}>
                    <GlobalUserAppProvider>
                        <Routes>
                            <Route element={<ProtectedLoginRoute />}>
                                <Route path="/login" element={<div>Login Page</div>} />
                            </Route>
                            <Route path="/" element={<div>Home Page</div>} />
                        </Routes>
                    </GlobalUserAppProvider>
                </MemoryRouter>
            );
        });

        expect(screen.getByText("Home Page")).toBeInTheDocument();
        expect(screen.queryByText("Login Page")).not.toBeInTheDocument();
    });

    it("Should render login page if the user is not logged in", async () => {
        (useGlobalUserAppState as jest.Mock).mockReturnValue({
            user: { isLoggedIn: false },
        });

        await act(async () => {
            render(
                <MemoryRouter initialEntries={["/login"]}>
                    <GlobalUserAppProvider>
                        <Routes>
                            <Route element={<ProtectedLoginRoute />}>
                                <Route path="/login" element={<div>Login Page</div>} />
                            </Route>
                            <Route path="/" element={<div>Home Page</div>} />
                        </Routes>
                    </GlobalUserAppProvider>
                </MemoryRouter>
            );
        });

        expect(screen.getByText("Login Page")).toBeInTheDocument();
        expect(screen.queryByText("Home Page")).not.toBeInTheDocument();
    });
});

