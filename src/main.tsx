import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { GlobalUserAppProvider, useGlobalUserAppState } from "./app/context/user"; 

import MainLayout from "./utils/Layout/MainLayout/MainLayout";
import App from "./App";

import "./index.css";

const Root = () => {
    const { user } = useGlobalUserAppState();

    return (
        <BrowserRouter basename="/">
            {user.isLoggedIn ? (
                <MainLayout>
                    <App />
                </MainLayout>
            ) : (
                <App />
            )}
        </BrowserRouter>
    );
};

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <GlobalUserAppProvider>
            <Root />
        </GlobalUserAppProvider>
    </StrictMode>
);
