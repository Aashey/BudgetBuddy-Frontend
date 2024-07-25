import { useQuery, useMutation } from "react-query";
import apiClient from "../../../services/apiClient";

const getIncomeCategory = async () => {
  return await apiClient.get(`/setup/income-category`);
};

export const useIncomeCategory = () => {
  return useQuery("getIncomeCategory", getIncomeCategory);
};
const getExpenseCategory = async () => {
  return await apiClient.get(`/setup/expense-category`);
};

export const useExpenseCategory = () => {
  return useQuery("getExpenseCategory", getExpenseCategory);
};
