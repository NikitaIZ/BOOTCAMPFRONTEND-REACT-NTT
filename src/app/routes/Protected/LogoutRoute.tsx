import { FC } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useGlobalUserAppState } from "../../context/user";

const ProtectedLogoutRoute: FC = () => {
  const { user } = useGlobalUserAppState();
  const isLoggedIn = user.length > 0 && user[0].isLoggedIn;

  return isLoggedIn ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedLogoutRoute;
