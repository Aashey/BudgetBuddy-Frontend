import { Route } from "react-router-dom";
import ExpenseTransaction from "../expense";
import IncomeTransaction from "../income";
import SavingTransaction from "../saving";
import WithdrawTransaction from "../withdraw";
import { ProtectedRoute } from "../../../routes/protectedRoutes";

export const TransactionRoutes = (
  <Route>
    <Route
      path="/transaction/income"
      element={<ProtectedRoute element={<IncomeTransaction />} />}
    />
    <Route
      path="/transaction/expense"
      element={<ProtectedRoute element={<ExpenseTransaction />} />}
    />
    <Route
      path="/transaction/saving"
      element={<ProtectedRoute element={<SavingTransaction />} />}
    />
    <Route
      path="/transaction/withdraw"
      element={<ProtectedRoute element={<WithdrawTransaction />} />}
    />
  </Route>
);
