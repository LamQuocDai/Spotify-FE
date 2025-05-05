import axiosCustom from "../utils/axiosCustom";

export const getUsersService = async (page = 1, size = 10) => {
  return await axiosCustom.get(`/users/?page=${page}&page_size=${size}`);
};

export const searchUsers = async (query, page = 1, size = 10) => {
  return await axiosCustom.get(`/users/search/?q=${encodeURIComponent(query)}&page=${page}&page_size=${size}`);
};

export const getUserService = async (userId) => {
  return await axiosCustom.get(`/users/${userId}/`);
};

export const createUserService = async (formData) => {
  return await axiosCustom.post("/users/create/", formData);
};

export const updateUserService = async (userId, formData) => {
  return await axiosCustom.put(`/users/${userId}/update/`, formData);
};

export const deleteUserService = async (userId) => {
  return await axiosCustom.delete(`/users/${userId}/delete/`);
};