import { memo, useCallback } from "react";
import { routeConfig } from "./RoutesConfig";
import { Route, RouteProps, Routes } from "react-router-dom";

const AppRouter = () => {
  const renderWithWrapper = useCallback((route: RouteProps) => {
    return <Route key={route.path} element={route.element} path={route.path} />;
  }, []);

  return <Routes>{Object.values(routeConfig).map(renderWithWrapper)}</Routes>;
};

export default memo(AppRouter);
