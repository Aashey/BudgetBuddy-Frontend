import { Route } from "react-router-dom";
import Dashboard from "../index";

export const DashboardRoutes = (
  <Route>
    <Route path="/dashboard" element={<Dashboard />} />
  </Route>
);
