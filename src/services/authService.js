import axiosCustom from "../utils/axiosCustom";

export const login = async (username, password) => {
  return await axiosCustom.post("/api/jwt/token/", { username, password });
};

export const regiter = async (formData) => {
  return await axiosCustom.post("/api/users/register/", formData);
};

export const refreshTokenService = async () => {
  return await axiosCustom().post("/api/jwt/token/refresh");
};
