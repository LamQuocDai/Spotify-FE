import axiosCustom from "../utils/axiosCustom";

export const getAllGenres = async () => {
    return await axiosCustom.get("/api/genres/");
};