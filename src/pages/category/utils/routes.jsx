import { Route } from "react-router-dom";
import { ProtectedRoute } from "../../../routes/protectedRoutes";
// import Category from "../index";
import IncomeCategory from "../income";
import ExpenseCategory from "../expense";
import LoanCategory from "../loan";

export const CategoryRoutes = (
  <Route>
    <Route
      path="/setup/income-category"
      element={<ProtectedRoute element={<IncomeCategory />} />}
    />
    <Route
      path="/setup/expense-category"
      element={<ProtectedRoute element={<ExpenseCategory />} />}
    />
    <Route
      path="/setup/loan-category"
      element={<ProtectedRoute element={<LoanCategory />} />}
    />
  </Route>
);
