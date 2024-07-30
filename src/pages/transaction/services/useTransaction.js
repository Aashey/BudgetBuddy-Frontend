import { useQuery, useMutation } from "react-query";
import apiClient from "../../../services/apiClient";

const getIncomeTransaction = async () => {
  return await apiClient.get(`/transaction/income`);
};

export const useIncomeTransaction = () => {
  return useQuery("getIncomeCategory", getIncomeTransaction);
};
