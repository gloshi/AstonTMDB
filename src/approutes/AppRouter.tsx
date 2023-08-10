import { Suspense, memo, useCallback } from "react";
import { routeConfig } from "./RoutesConfig";
import { Route, RouteProps, Routes } from "react-router-dom";
import Load from "../pages/Load";

const AppRouter = () => {
  const renderWithWrapper = useCallback((route: RouteProps) => {
    const element = (
      <Suspense fallback={<Load />}>
        <div className="page-wrapper">{route.element}</div>
      </Suspense>
    );
    return <Route key={route.path} element={element} path={route.path} />;
  }, []);

  return <Routes>{Object.values(routeConfig).map(renderWithWrapper)}</Routes>;
};

export default memo(AppRouter);
