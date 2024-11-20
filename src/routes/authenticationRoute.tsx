import { useContext } from "react";
import { Navigate, Outlet, RouteObject } from "react-router-dom";
import mainPath from "../constants/path";
import LoginPage from "../pages/LoginPage";
import { AppContext } from "../contexts/app.context";

function AuthenticationRouteWrapper() {
  const { isAuthenticated } = useContext(AppContext);
  return true ? <Outlet /> : <Navigate to={mainPath.home} />;
}

const AuthenticationRoute: RouteObject = {
  path: "",
  element: <AuthenticationRouteWrapper />,
  children: [
    {
      path: mainPath.login,
      element: <LoginPage />,
    },
  ],
};

export default AuthenticationRoute;
