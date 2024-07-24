import axios from "axios";
import { useMutation } from "react-query";

const API_BASE_URL = `https://a287-27-34-77-102.ngrok-free.app/api`;

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
  return await axios.post(`${API_BASE_URL}/register`, {
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
