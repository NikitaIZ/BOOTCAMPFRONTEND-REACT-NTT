import { FC } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Init from "./app/pages/Init/Init";
import Category from "./app/pages/Category/Category";
import Cart from "./app/pages/Cart/Cart";
import Login from "./app/pages/Login/Login";
import ProtectedLogoutRoute from "./app/routes/Protected/LogoutRoute";
import ProtectedLoginRoute from "./app/routes/Protected/LoginRoute";

const App: FC = () => {
    return (
        <Routes>
            <Route element={<ProtectedLoginRoute />}>
                <Route path="/login" element={<Login />} />
            </Route>

            <Route element={<ProtectedLogoutRoute />}>
                <Route path="/" element={<Init />} />
                <Route path="/category/:categoryId" element={<Category />} />
                <Route path="/cart" element={<Cart />} />
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
};

export default App;
