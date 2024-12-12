// test?
import { FC } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useGlobalUserAppState } from "../../context/user";

const ProtectedLogoutRoute: FC = () => {
    const { user } = useGlobalUserAppState();

    return user.isLoggedIn ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedLogoutRoute;
