import axios from "axios";
import { useMutation } from "react-query";

const API_BASE_URL = `https://a287-27-34-77-102.ngrok-free.app/api`;

const loginAPI = async ({ email, password }) => {
  return await axios.post(`${API_BASE_URL}/login`, { email, password });
};
const onSuccess = (data) => {
  localStorage.setItem("authToken", data.access_token);
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
