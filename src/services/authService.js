import axiosCustom from "../utils/axiosCustom";
import axios from "axios";

export const login = async (username, password) => {
  return await axiosCustom.post("/users/login/", { username, password });
};

export const registerUser = async (formData) => {
  return await axiosCustom.post("/users/register/", formData);
};

export const refreshTokenService = async () => {
  return await axios.post("/api/jwt/token/refresh");
};

export const socialLogin = async (code, provider) => {
  const response = await axios.post("http://127.0.0.1:8000/users/social-login/", {
    code,
    provider,
  });
  return response;
};