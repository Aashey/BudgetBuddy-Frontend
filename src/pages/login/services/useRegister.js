import apiClient from "../../../services/apiClient";
import { useMutation } from "react-query";

const registerUser = async ({
  username,
  email,
  password,
  password_confirmation,
}) => {
  console.log({
    username,
    email,
    password,
    password_confirmation,
  });
  return await apiClient.post(`/register`, {
    username,
    email,
    password,
    password_confirmation,
  });
};

const onSuccess = () => {
  console.log("Registered Successfully.");
};
const onError = (error) => {
  console.error("Registeration Failed.", error.response.data.errors);
};

export const useRegister = () => {
  return useMutation(registerUser, { onSuccess, onError });
};
