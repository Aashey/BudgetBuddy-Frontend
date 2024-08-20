import { Route } from "react-router-dom";
import { ProtectedRoute } from "../../../routes/protectedRoutes";
import BalanceOverview from "../balance";

export const AnalyticsRoutes = (
  <Route>
    <Route
      path="/analytics/balance"
      element={<ProtectedRoute element={<BalanceOverview />} />}
    />
  </Route>
);
