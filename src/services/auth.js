import apiClient from "./apiClient";
import { useMutation } from "react-query";

const loginAPI = async ({ email, password }) => {
  return await apiClient.post(`/login`, { email, password });
};
const onSuccess = (data) => {
  console.log(data);
  localStorage.setItem("authToken", data.data.token);
};
const onError = (error) => {
  console.error("Login Error: ", error.response || error.message);
};

export const useLogin = () => {
  return useMutation(loginAPI, { onSuccess, onError });
};

export const logout = () => {
  localStorage.removeItem("authToken");
};

export const isAuthenticated = () => {
  const token = localStorage.getItem("authToken");
  return Boolean(token);
};
