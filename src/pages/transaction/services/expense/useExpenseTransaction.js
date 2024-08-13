import { useQuery, useMutation } from "react-query";
import apiClient from "../../../../services/apiClient";

const getExpenseTransaction = async ({ queryKey }) => {
  const [, queryParams] = queryKey;
  return await apiClient.get(
    `/transaction/expense${queryParams ? `?${queryParams}` : ""}`
  );
};

export const useExpenseTransaction = (queryParams = "") => {
  return useQuery(
    ["getExpenseTransaction", queryParams],
    getExpenseTransaction,
    {
      refetchOnWindowFocus: false,
      retry: 1,
    }
  );
};

const createExpenseTransaction = async ({
  category_id,
  amount,
  date_spent,
  notes,
  is_recurring,
}) => {
  return await apiClient.post(`/transaction/expense`, {
    category_id,
    amount,
    date_spent,
    notes,
    is_recurring,
  });
};

export const useCreateExpenseTransaction = () => {
  return useMutation(createExpenseTransaction);
};

const updateExpenseTransaction = async ({
  id,
  category_id,
  amount,
  date_spent,
  notes,
  is_recurring,
}) => {
  return await apiClient.put(`/transaction/expense/${id}`, {
    category_id,
    amount,
    date_spent,
    notes,
    is_recurring,
  });
};

export const useUpdateExpenseTransaction = () => {
  return useMutation(updateExpenseTransaction);
};
const deleteExpenseTransaction = async ({ id }) => {
  return await apiClient.delete(`/transaction/expense/${id}`);
};

export const useDeleteExpenseTransaction = () => {
  return useMutation(deleteExpenseTransaction);
};
