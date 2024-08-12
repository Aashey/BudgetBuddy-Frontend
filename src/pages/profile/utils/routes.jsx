import { Route } from "react-router-dom";
import { ProtectedRoute } from "../../../routes/protectedRoutes";
import UserProfile from "..";

export const UserProfileRoutes = (
  <Route>
    <Route
      path="/profile"
      element={<ProtectedRoute element={<UserProfile />} />}
    />
  </Route>
);
