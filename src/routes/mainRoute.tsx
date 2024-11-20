import { Suspense, useContext } from "react";
import { Navigate, Outlet, RouteObject } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/HomePage";
import { AppContext } from "../contexts/app.context";
import mainPath from "../constants/path";
import CartPage from "../pages/CartPage";

function MainRouteWrapper() {
  const { isAuthenticated } = useContext(AppContext);
  return true ? (
    <MainLayout>
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
    </MainLayout>
  ) : (
    <Navigate to={mainPath.login} />
  );
}

const MainRoute: RouteObject = {
  path: "",
  element: <MainRouteWrapper />,
  children: [
    {
      path: mainPath.home,
      element: <HomePage />,
    },
    {
      path: mainPath.cart,
      element: <CartPage />,
    },
  ],
};

export default MainRoute;
