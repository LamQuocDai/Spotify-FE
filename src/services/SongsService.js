import axiosCustom from "../utils/axiosCustom";

export const getAllSongs = async () => {
    return await axiosCustom.get("/api/songs/");
};
export const searchSongs = async (q) => {
    return await axiosCustom.get(`/api/songs/search/?q=${encodeURIComponent(q)}&genre`);
}