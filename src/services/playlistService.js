import axiosCustom from "../utils/axiosCustom";

export const createPlaylistService = async (formData) => {
  return await axiosCustom.post("/playlists/create/", formData);
};

export const updatePlaylistService = async (id, formData) => {
  return await axiosCustom.put(`/playlists/${id}/update/`, formData);
};

export const deletePlaylistService = async (id) => {
  return await axiosCustom.delete(`/playlists/${id}/delete/`);
};

export const getPlaylistByIdService = async (id) => {
  return await axiosCustom.get(`/playlists/${id}/`);
};

export const getPlaylistService = async () => {
  return await axiosCustom.get("/playlists/");
};

export const getUserPlaylistByIdService = async (id) => {
  return await axiosCustom.get(`/playlists/user/${id}/`);
};

export const searchPlaylistsService = async (query) => {
  return await axiosCustom.get(`/playlists/search/?query=${query}`);
};