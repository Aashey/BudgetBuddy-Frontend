import { useQuery, useMutation } from "react-query";
import apiClient from "../../../../services/apiClient";

const getExpenseCategory = async ({ queryKey }) => {
  const [, queryParams] = queryKey;
  return await apiClient.get(
    `/setup/expense-category${queryParams ? `?${queryParams}` : ""}`
  );
};

export const useExpenseCategory = (queryParams = "") => {
  return useQuery(["getExpenseCategory", queryParams], getExpenseCategory, {
    refetchOnWindowFocus: false,
    retry: 1,
  });
};

const createExpenseCategory = async ({ title, description, status }) => {
  return await apiClient.post(`/setup/expense-category`, {
    title,
    description,
    status,
  });
};

export const useCreateExpenseCategory = () => {
  return useMutation(createExpenseCategory);
};

const updateExpenseCategory = async ({ title, description, status, id }) => {
  return await apiClient.put(`/setup/expense-category/${id}`, {
    title,
    description,
    status,
  });
};

export const useUpdateExpenseCategory = () => {
  return useMutation(updateExpenseCategory);
};

const deleteExpenseCategory = async ({ id }) => {
  return await apiClient.delete(`/setup/expense-category/${id}`);
};

export const useDeleteExpenseCategory = () => {
  return useMutation(deleteExpenseCategory);
};
