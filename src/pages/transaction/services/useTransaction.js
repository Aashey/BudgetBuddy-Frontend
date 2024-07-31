import { useQuery, useMutation } from "react-query";
import apiClient from "../../../services/apiClient";

const getIncomeTransaction = async () => {
  return await apiClient.get(`/transaction/income`);
};

export const useIncomeTransaction = () => {
  return useQuery("getIncomeTransaction", getIncomeTransaction, {
    refetchOnWindowFocus: false,
    retry: 1,
  });
};
const createIncomeTransaction = async ({
  category_id,
  amount,
  date_received,
  notes,
  is_recurring,
}) => {
  return await apiClient.post(`/transaction/income`, {
    category_id,
    amount,
    date_received,
    notes,
    is_recurring,
  });
};

export const useCreateIncomeTransaction = () => {
  return useMutation(createIncomeTransaction);
};

const updateIncomeTransaction = async ({
  id,
  category_id,
  amount,
  date_received,
  notes,
  is_recurring,
}) => {
  return await apiClient.put(`/transaction/income/${id}`, {
    category_id,
    amount,
    date_received,
    notes,
    is_recurring,
  });
};

export const useUpdateIncomeTransaction = () => {
  return useMutation(updateIncomeTransaction);
};
const deleteIncomeTransaction = async ({ id }) => {
  return await apiClient.delete(`/transaction/income/${id}`);
};

export const useDeleteIncomeTransaction = () => {
  return useMutation(deleteIncomeTransaction);
};
const getExpenseTransaction = async () => {
  return await apiClient.get(`/transaction/expense`);
};

export const useExpenseTransaction = () => {
  return useQuery("getExpenseTransaction", getExpenseTransaction, {
    refetchOnWindowFocus: false,
    retry: 1,
  });
};
const createExpenseTransaction = async ({
  category_id,
  amount,
  date_received,
  notes,
  is_recurring,
}) => {
  return await apiClient.post(`/transaction/expense`, {
    category_id,
    amount,
    date_received,
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
