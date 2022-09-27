import { Navigate } from "umi";

export function patchClientRoutes({ routes }) {
  routes[0].routes.unshift({
    path: "/",
    element: <Navigate to="/docs" replace />,
  });

  routes[0].routes.push({
    path: "*",
    element: <Navigate to="/notFound" replace />,
  });
}
