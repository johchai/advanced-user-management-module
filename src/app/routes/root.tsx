import { Outlet } from "react-router";

export const ErrorBoundary = () => {
  return <div>ErrorBoundary - Something went wrong!</div>;
};

const AppRoot = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default AppRoot;
