import { useQuery } from "react-query";
import apiClient from "../../../services/apiClient";

const getTotalData = async () => {
  return await apiClient.get("/dashboard/total");
};

export const useGetTotalData = () => {
  return useQuery("getTotalData", getTotalData, {
    retry: 1,
  });
};
