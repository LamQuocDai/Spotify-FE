import axios from "axios";
import { getAccessToken } from "./token";

const axiosCustom = axios.create({
  baseURL: "http://127.0.0.1:8000",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor - automatically add authentication token to requests
axiosCustom.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - handle common response scenarios
axiosCustom.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle unauthorized errors (401)
    if (error.response && error.response.status === 401) {
      // You might want to redirect to login or refresh token
      console.log("Authentication error");
    }
    return Promise.reject(error);
  }
);

export default axiosCustom;
