import { Route } from "react-router-dom";
import LoginForm from "../../components/LoginForm";
import SignupForm from "../../components/login/SignUpForm";

export const LoginRoutes = (
  <Route>
    <Route path="/" element={<LoginForm />} />
    <Route path="/login" element={<LoginForm />} />
    <Route path="/signup" element={<SignupForm />} />
  </Route>
);
