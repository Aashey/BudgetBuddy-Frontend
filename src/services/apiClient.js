import axios from "axios";

const apiClient = axios.create({
  baseURL: `http://192.168.1.124:8000/api`,
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    console.log("token", token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
