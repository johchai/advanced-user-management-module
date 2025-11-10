import { useMemo } from "react";

import { Loading } from "@/components/ui";
import { paths } from "@/config";
import { QueryClient, useQueryClient } from "@tanstack/react-query";
import {
  type ActionFunction,
  type LoaderFunction,
  RouterProvider,
  createBrowserRouter
} from "react-router";

import {
  default as AppRoot,
  ErrorBoundary as AppRootErrorBoundary
} from "./routes/root";

type RouteModule = {
  clientLoader?: (queryClient: QueryClient) => LoaderFunction;
  clientAction?: (queryClient: QueryClient) => ActionFunction;
  default?: React.ComponentType;
  [key: string]: unknown;
};

// Route module that dynamically import and convert into a React Router route configuration
const convert = (queryClient: QueryClient) => (m: RouteModule) => {
  const { clientLoader, clientAction, default: Component, ...rest } = m;
  return {
    ...rest,
    loader: clientLoader?.(queryClient),
    action: clientAction?.(queryClient),
    Component: Component || (() => <Loading />)
  };
};

const createAppRouter = (queryClient: QueryClient) =>
  createBrowserRouter([
    {
      // unprotected route
      path: "/auth",
      children: [
        {
          path: "login",
          lazy: () => import("./routes/auth/login").then(convert(queryClient))
        }
      ]
    },
    {
      // TODO: add guard wrapper here
      // protected route
      path: "/",
      element: (
        <div>
          <AppRoot />
        </div>
      ),
      ErrorBoundary: AppRootErrorBoundary,
      children: [
        {
          path: paths.root.paths,
          lazy: () => import("./routes/users/root").then(convert(queryClient))
        }
      ]
    }
  ]);

export const AppRouter = () => {
  const queryClient = useQueryClient();

  const router = useMemo(() => createAppRouter(queryClient), [queryClient]);
  return <RouterProvider router={router} />;
};
