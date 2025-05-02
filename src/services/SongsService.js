import axiosCustom from "../utils/axiosCustom";

export const getAllSongs = async () => {
    const res = await axiosCustom.get("/api/songs/");
    return res;
};
export const searchSongs = async (q) => {
    const res = await axiosCustom.get(`/api/songs/search/?q=${encodeURIComponent(q)}&genre`);
    return res;
}