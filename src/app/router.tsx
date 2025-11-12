import { useMemo } from "react";

import LoginPage from "@/app/routes/auth/login";
import { Navigate, RouterProvider, createBrowserRouter } from "react-router";

import AppRoot, { ErrorBoundary as AppRootErrorBoundary } from "./routes/root";
import { UsersRoot } from "./routes/users/root";

const createAppRouter = () =>
  createBrowserRouter([
    {
      path: "/",
      element: <Navigate to="/users" replace />
    },
    {
      path: "/auth",
      children: [{ path: "login", element: <LoginPage /> }]
    },
    {
      path: "/users",
      element: <AppRoot />,
      errorElement: <AppRootErrorBoundary />,
      children: [{ index: true, element: <UsersRoot /> }]
    }
  ]);

export const AppRouter = () => {
  const router = useMemo(() => createAppRouter(), []);
  return <RouterProvider router={router} />;
};
