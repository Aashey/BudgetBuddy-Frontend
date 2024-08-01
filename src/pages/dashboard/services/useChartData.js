import { useQuery } from "react-query";
import apiClient from "../../../services/apiClient";

const getChartData = async () => {
  return await apiClient.get("/charts/monthly-data");
};

export const useGetChartData = () => {
  return useQuery("getChartData", getChartData, {
    retry: 1,
  });
};
