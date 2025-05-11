import axiosCustom from "../utils/axiosCustom";

export const getUsersService = async (page = 1, pageSize = 10) => {
  try {
    const response = await axiosCustom.get(
      `/users/?page=${page}&page_size=${pageSize}`
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch users");
  }
};
export const searchUsers = async (query, page = 1, pageSize = 10) => {
  try {
    const response = await axiosCustom.get(
      `/users/search/?q=${encodeURIComponent(
        query
      )}&page=${page}&page_size=${pageSize}`
    );
    console.log("searchUsers Response:", response.data);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to search users");
  }
};

export const getUserService = async (userId) => {
  try {
    const response = await axiosCustom.get(`/users/${userId}/`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch user");
  }
};

export const createUserService = async (formData) => {
  try {
    const response = await axiosCustom.post("/users/create/", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to create user");
  }
};

export const updateUserService = async (userId, formData) => {
  try {
    const response = await axiosCustom.put(
      `/users/${userId}/update/`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to update user");
  }
};

export const deleteUserService = async (userId) => {
  try {
    const response = await axiosCustom.delete(`/users/${userId}/delete/`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to delete user");
  }
};
