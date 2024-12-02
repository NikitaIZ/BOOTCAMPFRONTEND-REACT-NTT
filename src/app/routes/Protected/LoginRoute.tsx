import { FC } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useGlobalUserAppState } from "../../context/user";

const ProtectedLoginRoute: FC = () => {
    const { user } = useGlobalUserAppState();

    return user.isLoggedIn ? <Navigate to="/" replace /> : <Outlet />;
};

export default ProtectedLoginRoute;
