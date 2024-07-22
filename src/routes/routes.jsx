import { createBrowserRouter } from "react-router-dom";
import { createRoutesFromElements } from "react-router";
import { LoginRoutes } from "../pages/login/routes";

export const routes = createBrowserRouter(
  createRoutesFromElements(<>{LoginRoutes}</>)
);
