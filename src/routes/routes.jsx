import { createBrowserRouter } from "react-router-dom";
import { createRoutesFromElements } from "react-router";
import { LoginRoutes } from "../pages/login/utils/routes";
import { DashboardRoutes } from "../pages/dashboard/utils/routes";

export const routes = createBrowserRouter(
  createRoutesFromElements(
    <>
      {LoginRoutes}
      {DashboardRoutes}
    </>
  )
);
