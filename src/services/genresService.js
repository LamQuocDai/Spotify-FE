import axiosCustom from "../utils/axiosCustom";

export const getAllGenres = async () => {
    return await axiosCustom.get("/api/genres/");
};

export const searchGenres = async (query, page = 1, size = 10) => {
    return await axiosCustom.get(`/api/genres/search/?q=${encodeURIComponent(query)}&page=${page}&page_size=${size}`);
};

export const getGenreById = async (id) => {
    return await axiosCustom.get(`/api/genres/${id}/`);
};

export const createGenre = async (genreData) => {
    return await axiosCustom.post("/api/genres/", genreData);
};

export const updateGenre = async (id, genreData) => {
    return await axiosCustom.put(`/api/genres/${id}/`, genreData);
};

export const deleteGenre = async (id) => {
    return await axiosCustom.delete(`/api/genres/${id}/`);
};