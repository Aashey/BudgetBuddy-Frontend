import { useQuery, useMutation } from "react-query";
import apiClient from "../../../../services/apiClient";

const getLoanCategory = async () => {
  return await apiClient.get(`/setup/loan-category`);
};

export const useGetLoanCategory = () => {
  return useQuery("getLoanCategory", getLoanCategory, {
    refetchOnWindowFocus: false,
    retry: 1,
  });
};

const createLoanCategory = async ({ title, description }) => {
  return await apiClient.post(`/setup/loan-category`, { title, description });
};

export const useCreateLoanCategory = () => {
  return useMutation(createLoanCategory);
};

const updateLoanCategory = async ({ title, description, id }) => {
  return await apiClient.put(`/setup/loan-category/${id}`, {
    title,
    description,
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
