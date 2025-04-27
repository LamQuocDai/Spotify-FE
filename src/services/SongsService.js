import axiosCustom from "../utils/axiosCustom";

export const getAllSongs = async () => {
    const res = await axiosCustom.get("/api/");
    return res;
};