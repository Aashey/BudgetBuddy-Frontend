import { useQuery } from "react-query";
import apiClient from "../../../services/apiClient";

const getTotalData = async () => {
  return await apiClient.get("/dashboard/overview");
};

export const useGetTotalData = () => {
  return useQuery("getTotalData", getTotalData, {
    refetchOnWindowFocus: false,
    retry: 1,
  });
};
