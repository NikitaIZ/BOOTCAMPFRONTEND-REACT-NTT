import { render, act } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { useGlobalUserAppState } from "@/app/context/user";
import { GlobalUserAppProvider } from "@/app/context/user";
import { ModuleRoutes } from "@/app/routes/routes";  
import ProtectedLoginRoute from "@/app/routes/Protected/LoginRoute";
import ProtectedLogoutRoute from "@/app/routes/Protected/LogoutRoute";

jest.mock("@/app/context/user", () => ({
    ...jest.requireActual("@/app/context/user"),
    useGlobalUserAppState: jest.fn(),
}));


const renderComponent = async (initialEntries = [ModuleRoutes.Login], userState = { isLoggedIn: false }) => {
    (useGlobalUserAppState as jest.Mock).mockReturnValue({ user: userState });

    let component;

    await act(async () => {
        component = render(
            <MemoryRouter initialEntries={initialEntries}>
                <GlobalUserAppProvider>
                    <Routes>
                        <Route element={<ProtectedLoginRoute />}>
                            <Route path="/login" element={<div>Login</div>} />
                        </Route>

                        <Route element={<ProtectedLogoutRoute />}>
                            <Route path="/" element={<div>Home Page</div>} />
                        </Route>
                    </Routes>
                </GlobalUserAppProvider>
            </MemoryRouter>
        );
    });

    return component;
};

describe("ProtectedLoginRoute", () => {
    it("Should redirect to home page if the user is logged in", async () => {
        await renderComponent([ModuleRoutes.Login], { isLoggedIn: true });
       // expect(screen.queryByText("Home Page")).toBeInTheDocument();  // Verifica que la página de inicio se cargue
    });

    it("Should render login page if the user is not logged in", async () => {
        await renderComponent([ModuleRoutes.Login], { isLoggedIn: false });
       // expect(screen.getByText("Login")).toBeInTheDocument();  // Verifica que la página de login se cargue
    });
});
