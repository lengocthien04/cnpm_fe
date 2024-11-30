import { useRoutes } from "react-router-dom";
import MainRoute from "../routes/mainRoute";
import AuthenticationRoute from "../routes/authenticationRoute";
import AdminRoute from "../routes/adminRoute";

export default function useRouteElements() {
  const routeElements = useRoutes([
    {
      path: "",
      children: [MainRoute, AuthenticationRoute, AdminRoute],
    },
  ]);
  return routeElements;
}
