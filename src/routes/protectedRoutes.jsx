import { Navigate, Route } from "react-router-dom";
import { isAuthenticated } from "../services/auth";

export const ProtectedRoute = ({ element, ...rest }) => {
  return isAuthenticated() ? element : <Navigate to="/login" />;
};

export const RIARoute = ({ element, ...rest }) => {
  return isAuthenticated() ? <Navigate to="/dashboard" /> : element;
};
