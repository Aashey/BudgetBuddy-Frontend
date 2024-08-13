import { useQuery, useMutation } from "react-query";
import apiClient from "../../../../services/apiClient";

const getIncomeCategory = async ({ queryKey }) => {
  const [, queryParams] = queryKey;

  return await apiClient.get(
    `/setup/income-category${queryParams ? `?${queryParams}` : ""}`
  );
};

export const useIncomeCategory = (queryParams = "") => {
  return useQuery(["getIncomeCategory", queryParams], getIncomeCategory, {
    refetchOnWindowFocus: false,
    retry: 1,
  });
};

const createIncomeCategory = async ({ title, description, status }) => {
  return await apiClient.post(`/setup/income-category`, {
    title,
    description,
    status,
  });
};

export const useCreateIncomeCategory = () => {
  return useMutation(createIncomeCategory);
};

const updateIncomeCategory = async ({ title, description, status, id }) => {
  return await apiClient.put(`/setup/income-category/${id}`, {
    title,
    description,
    status,
  });
};

export const useUpdateIncomeCategory = () => {
  return useMutation(updateIncomeCategory);
};

const deleteIncomeCategory = async ({ id }) => {
  return await apiClient.delete(`/setup/income-category/${id}`);
};

export const useDeleteIncomeCategory = () => {
  return useMutation(deleteIncomeCategory);
};
