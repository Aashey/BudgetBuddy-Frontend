import { Navigate, Route } from "react-router-dom";
import Dashboard from "../index";
import { ProtectedRoute } from "../../../routes/protectedRoutes";

export const DashboardRoutes = (
  <Route>
    <Route path="/" element={<Navigate to="/dashboard" />} />
    <Route
      path="/dashboard"
      element={<ProtectedRoute element={<Dashboard />} />}
    />
  </Route>
);
