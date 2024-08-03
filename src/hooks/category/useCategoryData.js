import { useExpenseCategory } from "../../pages/category/services/expense/useExpenseCategory";
import { useIncomeCategory } from "../../pages/category/services/income/useIncomeCategory";

const useCategoryData = (type) => {
  const {
    data: incomeData,
    error: incomeError,
    isLoading: incomeIsLoading,
  } = useIncomeCategory();

  const {
    data: expenseData,
    error: expenseError,
    isLoading: expenseIsLoading,
  } = useExpenseCategory();

  const data = type === "income" ? incomeData : expenseData;
  const error = type === "income" ? incomeError : expenseError;
  const isLoading = type === "income" ? incomeIsLoading : expenseIsLoading;

  return { data, error, isLoading };
};

export default useCategoryData;
