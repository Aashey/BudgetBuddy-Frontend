import { useQuery } from "react-query";
import apiClient from "../../../services/apiClient";

const getTransaction = async ({ queryKey }) => {
  const [, queryParams] = queryKey;
  return await apiClient.get(
    `/transaction/get-transactions${queryParams ? `?${queryParams}` : ""}`
  );
};

export const useGetTransaction = (queryParams = "") => {
  return useQuery(["getTransaction", queryParams], getTransaction, {
    refetchOnWindowFocus: false,
    retry: 1,
  });
};
