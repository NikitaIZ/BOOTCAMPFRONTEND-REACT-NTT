import { FC } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useGlobalUserAppState } from "../../context/user";

const ProtectedLoginRoute: FC = () => {
    const { user } = useGlobalUserAppState();
    const isLoggedIn = user.length > 0 && user[0].isLoggedIn;

    return isLoggedIn ? <Navigate to="/" replace /> : <Outlet />;
};

export default ProtectedLoginRoute;
