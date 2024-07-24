import axios from "axios";
import { useMutation } from "react-query";

const API_BASE_URL = `https://dc6d-2400-1a00-b040-5bdf-589b-bbf2-2bfe-36b6.ngrok-free.app`;

const loginAPI = async (email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw new Error(error || "Login Failed.");
  }
};
const onSuccess = (data) => {
  localStorage.setItem("authToken", data.access_token);
};
const onError = (error) => {
  console.error("Login Error: ", error.message);
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
