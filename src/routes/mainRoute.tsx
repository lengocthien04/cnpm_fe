import { Suspense, useContext } from "react";
import { Navigate, Outlet, RouteObject } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/HomePage";
import { AppContext } from "../contexts/app.context";
import mainPath from "../constants/path";
import PrintingPage from "../pages/PrintingPage/PrintingPage";
import LtkBranch from "../pages/PrintingPage/children/LtkBranch/LtkBranch";
import DaBranch from "../pages/PrintingPage/children/DaBranch/DaBranch";
import PrintingHistoryPage from "../pages/PrintingHistoryPage";

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
      path: mainPath.printing,
      element: <PrintingPage />,
    },
    {
      path: mainPath.printing,
      element: <PrintingPage />,
      children: [
        {
          path: "ltk-branch",
          element: <LtkBranch />,
        },
        {
          path: "da-branch",
          element: <DaBranch />,
        },
      ],
    },
    {
      path: mainPath.printinghistory,
      element: <PrintingHistoryPage />,
    },
  ],
};

export default MainRoute;
