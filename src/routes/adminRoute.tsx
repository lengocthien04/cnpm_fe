import { Suspense, useContext } from "react";
import { Navigate, Outlet, RouteObject } from "react-router-dom";
import { AppContext } from "../contexts/app.context";
import mainPath, { adminPath } from "../constants/path";
import AdminLayout from "../layouts/AdminLayout";
import AdminPages from "../pages/AdminPages/AdminPages";
import AdminUserDetail from "../pages/AdminPages/AdminUserDetail";

function AdminRouteWrapper() {
  const { isAuthenticated, profile } = useContext(AppContext);
  return isAuthenticated && profile && profile.authority_group == "admin" ? (
    <AdminLayout>
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
    </AdminLayout>
  ) : (
    <Navigate to={mainPath.login} />
  );
}

// Export AdminRoute as a constant following proper conventions
const AdminRoute: RouteObject = {
  path: adminPath.admin,
  element: <AdminRouteWrapper />,
  children: [
    { path: "", element: <AdminPages /> },
    {},
    {
      path: adminPath.userList,
    },
    {
      path: adminPath.userInfo,
      element: <AdminUserDetail />,
    },
    {
      path: adminPath.createUser,
    },
    {
      path: adminPath.printerConfig,
    },
    {
      path: adminPath.report,
    },
  ],
};

export default AdminRoute;
