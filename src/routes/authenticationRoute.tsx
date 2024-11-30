import { useContext } from "react";
import { Navigate, Outlet, RouteObject } from "react-router-dom";
import mainPath from "../constants/path";
import LoginPage from "../pages/LoginPage";
import { AppContext } from "../contexts/app.context";
import MainLayout from "../layouts/MainLayout";

function AuthenticationRouteWrapper() {
  const { isAuthenticated } = useContext(AppContext);
  return !isAuthenticated ? (
    <MainLayout>
      <Outlet />
    </MainLayout>
  ) : (
    <Navigate to={mainPath.home} />
  );
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
