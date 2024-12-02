import { FC } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useGlobalUserAppState } from "../../context/user";

const ProtectedLoginRoute: FC = () => {
    const { user } = useGlobalUserAppState();

    return user.isLoggedIn === false ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedLoginRoute;
