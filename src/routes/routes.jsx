import { createBrowserRouter, Route } from "react-router-dom";
import { createRoutesFromElements } from "react-router";
import { LoginRoutes } from "../pages/login/utils/routes";
import { DashboardRoutes } from "../pages/dashboard/utils/routes";
import { CategoryRoutes } from "../pages/category/utils/routes";
import CustomLayout from "../components/common/sider/Layout";

export const routes = createBrowserRouter(
  createRoutesFromElements(
    <>
      {LoginRoutes}
      <Route element={<CustomLayout />}>
        {DashboardRoutes}
        {CategoryRoutes}
      </Route>
    </>
  )
);
