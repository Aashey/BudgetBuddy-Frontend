import { useQuery } from "react-query";
import apiClient from "../../../services/apiClient";

const getBalanceOverview = async () => {
  const response = await apiClient.get(`/analytics/balance`);
  return response.data;
};

export const useBalanceOverview = () => {
  return useQuery("getBalanceOverview", getBalanceOverview, {
    refetchOnWindowFocus: false,
    retry: 1,
  });
};

const getBalanceChart = async () => {
  const response = await apiClient.get(`/analytics/balance/overview`);
  return response.data;
};

export const useBalanceChart = () => {
  return useQuery("getBalanceChart", getBalanceChart, {
    refetchOnWindowFocus: false,
    retry: 1,
  });
};
