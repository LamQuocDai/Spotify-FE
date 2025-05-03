import axiosCustom from "../utils/axiosCustom";

export const getUsersService = async () => {
  const res = await axiosCustom.get("/users/");
  return res;
};

export const getUserService = async (userId) => {
  const res = await axiosCustom.get(`/users/${userId}/`);
  return res;
};

export const createUserService = async (formData) => {
  const res = await axiosCustom.post("/users/create/", formData);
  return res;
};

export const updateUserService = async (userId, formData) => {
  const res = await axiosCustom.put(`/users/${userId}/update/`, formData);
  return res;
};

export const deleteUserService = async (userId) => {
  const res = await axiosCustom.delete(`/users/${userId}/delete/`);
  return res;
};
