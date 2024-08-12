import { useQuery, useMutation } from "react-query";
import apiClient from "../../../../services/apiClient";

const getSavingTransaction = async () => {
  return await apiClient.get(`/transaction/saving`);
};

export const useSavingTransaction = () => {
  return useQuery("getSavingTransaction", getSavingTransaction, {
    refetchOnWindowFocus: false,
    retry: 1,
  });
};
const createSavingTransaction = async ({ amount, notes }) => {
  return await apiClient.post(`/transaction/saving`, {
    amount,
    notes,
  });
};

export const useCreateSavingTransaction = () => {
  return useMutation(createSavingTransaction);
};

const updateSavingTransaction = async ({ id, amount, notes }) => {
  return await apiClient.put(`/transaction/saving/${id}`, {
    amount,
    notes,
  });
};

export const useUpdateSavingTransaction = () => {
  return useMutation(updateSavingTransaction);
};
const deleteSavingTransaction = async ({ id }) => {
  return await apiClient.delete(`/transaction/saving/${id}`);
};

export const useDeleteSavingTransaction = () => {
  return useMutation(deleteSavingTransaction);
};

const getSavingGoal = async () => {
  return await apiClient.get(`/transaction/saving-goal`);
};

export const useGetSavingGoal = () => {
  return useQuery("getSavingGoal", getSavingGoal, {
    refetchOnWindowFocus: false,
    retry: 1,
  });
};

const createSavingGoal = async ({ target_amount }) => {
  return await apiClient.post(`/transaction/saving-goal`, {
    target_amount,
  });
};

export const useCreateSavingGoal = () => {
  return useMutation(createSavingGoal);
};
