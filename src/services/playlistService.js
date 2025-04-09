import axiosCustom from "../utils/axiosCustom";

export const createPlaylistService = async (formData) => {
  const res = await axiosCustom.post("/playlists/create/", formData);
  return res;
};

export const updatePlaylistService = async (id, formData) => {
  const res = await axiosCustom.put(`/playlists/${id}/update/`, formData);
  return res;
};

export const deletePlaylistService = async (id) => {
  const res = await axiosCustom.delete(`/playlists/${id}/delete/`);
  return res;
};

export const getPlaylistByIdService = async (id) => {
  const res = await axiosCustom.get(`/playlists/${id}/`);
  return res;
};

export const getUserPlaylistService = async () => {
  const res = await axiosCustom.get("/playlists/");
  return res;
};

export const searchPlaylistsService = async (query) => {
  const res = await axiosCustom.get(`/playlists/search/?query=${query}`);
  return res;
};