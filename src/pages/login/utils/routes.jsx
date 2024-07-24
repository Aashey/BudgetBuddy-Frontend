import { Route } from "react-router-dom";
import LoginForm from "../../../components/login/LoginForm";
import SignupForm from "../../../components/login/SignUpForm";
import { RIARoute } from "../../../routes/protectedRoutes";
export const LoginRoutes = (
  <Route>
    <Route path="/" element={<RIARoute element={<LoginForm />} />} />
    <Route path="/login" element={<RIARoute element={<LoginForm />} />} />
    <Route path="/signup" element={<RIARoute element={<SignupForm />} />} />
  </Route>
);
