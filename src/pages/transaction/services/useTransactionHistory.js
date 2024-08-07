import { useQuery } from "react-query";
import apiClient from "../../../services/apiClient";

const getTransaction = async () => {
  return await apiClient.get(`/transaction/get-transactions`);
};

export const useGetTransaction = () => {
  return useQuery("getTransaction", getTransaction, {
    refetchOnWindowFocus: false,
    retry: 1,
  });
};
