import { useQuery, useMutation } from "react-query";
import apiClient from "../../../services/apiClient";

const getIncomeCategory = async () => {
  return await apiClient.get(`/setup/income-category`);
};

export const useIncomeCategory = () => {
  return useQuery("getIncomeCategory", getIncomeCategory);
};
const getLoanCategory = async () => {
  return await apiClient.get(`/setup/loan-category`);
};

export const useGetLoanCategory = () => {
  return useQuery("getLoanCategory", getLoanCategory);
};
const getExpenseCategory = async () => {
  return await apiClient.get(`/setup/expense-category`);
};

export const useExpenseCategory = () => {
  return useQuery("getExpenseCategory", getExpenseCategory);
};

const createIncomeCategory = async ({ title, description }) => {
  return await apiClient.post(`/setup/income-category`, { title, description });
};

export const useCreateIncomeCategory = () => {
  return useMutation(createIncomeCategory);
};
const createExpenseCategory = async ({ title, description }) => {
  return await apiClient.post(`/setup/expense-category`, {
    title,
    description,
  });
};

export const useCreateExpenseCategory = () => {
  return useMutation(createExpenseCategory);
};
const createLoanCategory = async ({ title, description }) => {
  return await apiClient.post(`/setup/loan-category`, { title, description });
};

export const useCreateLoanCategory = () => {
  return useMutation(createLoanCategory);
};

const deleteIncomeCategory = async ({ id }) => {
  return await apiClient.delete(`/setup/income-category/${id}`);
};

export const useDeleteIncomeCategory = () => {
  return useMutation(deleteIncomeCategory);
};
const deleteExpenseCategory = async ({ id }) => {
  return await apiClient.delete(`/setup/expense-category/${id}`);
};

export const useDeleteExpenseCategory = () => {
  return useMutation(deleteExpenseCategory);
};
const deleteLoanCategory = async ({ id }) => {
  return await apiClient.delete(`/setup/loan-category/${id}`);
};

export const useDeleteLoanCategory = () => {
  return useMutation(deleteLoanCategory);
};
