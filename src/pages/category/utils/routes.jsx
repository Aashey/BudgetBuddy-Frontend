import { Route } from "react-router-dom";
import { ProtectedRoute } from "../../../routes/protectedRoutes";
// import Category from "../index";
import IncomeCategory from "../income";
import ExpenseCategory from "../expense";

export const CategoryRoutes = (
  <Route>
    {/* <Route
      path="/setup/category"
      element={<ProtectedRoute element={<Category />} />}
    /> */}
    <Route
      path="/setup/income-category"
      element={<ProtectedRoute element={<IncomeCategory />} />}
    />
    <Route
      path="/setup/expense-category"
      element={<ProtectedRoute element={<ExpenseCategory />} />}
    />
  </Route>
);
