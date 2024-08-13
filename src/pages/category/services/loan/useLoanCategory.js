import { useQuery, useMutation } from "react-query";
import apiClient from "../../../../services/apiClient";

const getLoanCategory = async ({ queryKey }) => {
  const [, queryParams] = queryKey;
  return await apiClient.get(
    `/setup/loan-category${queryParams ? `?${queryParams}` : ""}`
  );
};

export const useGetLoanCategory = (queryParams = "") => {
  return useQuery(["getLoanCategory", queryParams], getLoanCategory, {
    refetchOnWindowFocus: false,
    retry: 1,
  });
};

const createLoanCategory = async ({ title, description, status }) => {
  return await apiClient.post(`/setup/loan-category`, {
    title,
    description,
    status,
  });
};

export const useCreateLoanCategory = () => {
  return useMutation(createLoanCategory);
};

const updateLoanCategory = async ({ title, description, status, id }) => {
  return await apiClient.put(`/setup/loan-category/${id}`, {
    title,
    description,
    status,
  });
};

export const useUpdateLoanCategory = () => {
  return useMutation(updateLoanCategory);
};

const deleteLoanCategory = async ({ id }) => {
  return await apiClient.delete(`/setup/loan-category/${id}`);
};

export const useDeleteLoanCategory = () => {
  return useMutation(deleteLoanCategory);
};
