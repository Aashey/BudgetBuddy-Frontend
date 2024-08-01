import { useQuery, useMutation } from "react-query";
import apiClient from "../../../../services/apiClient";

const getWithdrawTransaction = async () => {
  return await apiClient.get(`/transaction/withdraw`);
};

export const useWithdrawTransaction = () => {
  return useQuery("getWithdrawTransaction", getWithdrawTransaction, {
    refetchOnWindowFocus: false,
    retry: 1,
  });
};
const createWithdrawTransaction = async ({ amount, notes }) => {
  return await apiClient.post(`/transaction/withdraw`, {
    amount,
    notes,
  });
};

export const useCreateWithdrawTransaction = () => {
  return useMutation(createWithdrawTransaction);
};

const updateWithdrawTransaction = async ({ id, amount, notes }) => {
  return await apiClient.put(`/transaction/withdraw/${id}`, {
    amount,
    notes,
  });
};

export const useUpdateWithdrawTransaction = () => {
  return useMutation(updateWithdrawTransaction);
};
const deleteWithdrawTransaction = async ({ id }) => {
  return await apiClient.delete(`/transaction/withdraw/${id}`);
};

export const useDeleteWithdrawTransaction = () => {
  return useMutation(deleteWithdrawTransaction);
};
