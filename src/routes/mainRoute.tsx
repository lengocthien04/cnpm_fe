import { Suspense, useContext } from "react";
import { Navigate, Outlet, RouteObject } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/HomePage";
import { AppContext } from "../contexts/app.context";
import mainPath from "../constants/path";
import PrintingPage from "../pages/PrintingPage/PrintingPage";
import PrintingHistoryPage from "../pages/PrintingHistoryPage";
import PaymentPage from "../pages/PaymentPage";
import UserPage from "../pages/UserPage/UserPage";

function MainRouteWrapper() {
  const { isAuthenticated } = useContext(AppContext);
  return isAuthenticated ? (
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
      path: mainPath.printing,
      element: <PrintingPage />,
    },
    {
      path: mainPath.printing,
      element: <PrintingPage />,
    },
    {
      path: mainPath.printinghistory,
      element: <PrintingHistoryPage />,
    },
    { path: mainPath.payment, element: <PaymentPage /> },
    { path: mainPath.userprofile, element: <UserPage /> },
  ],
};

export default MainRoute;
