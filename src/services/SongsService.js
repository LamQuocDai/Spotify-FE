import axiosCustom from "../utils/axiosCustom";

export const getAllSongs = async (page = 1, size = 10) => {
    return await axiosCustom.get(`/api/songs/?page=${page}&page_size=${size}`);
};

export const searchSongs = async (query, page = 1, size = 10) => {
    return await axiosCustom.get(`/api/songs/search/?q=${encodeURIComponent(query)}&page=${page}&page_size=${size}`);
};

export const getSongById = async (id) => {
    return await axiosCustom.get(`/api/songs/${id}/`);
};

export const createSong = async (songData) => {
    const formData = new FormData();
    formData.append("song_name", songData.song_name);
    formData.append("singer_name", songData.singer_name);
    formData.append("genre", songData.genre_id);
    if (songData.audio_file) formData.append("audio_file", songData.audio_file);
    if (songData.image_file) formData.append("image_file", songData.image_file);
    if (songData.video_file) formData.append("video_file", songData.video_file);

    return await axiosCustom.post("/api/songs/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
};

export const updateSong = async (id, songData, currentUrls) => {
    console.log(songData);
    
    const formData = new FormData();
    formData.append("song_name", songData.song_name);
    formData.append("singer_name", songData.singer_name);
    formData.append("genre", songData.genre_id);
    if (songData.audio_file) formData.append("audio_file", songData.audio_file);
    else if (currentUrls.url_audio) formData.append("url_audio", currentUrls.url_audio);
    if (songData.image_file) formData.append("image_file", songData.image_file);
    else if (currentUrls.image) formData.append("image", currentUrls.image);
    if (songData.video_file) formData.append("video_file", songData.video_file);
    else if (currentUrls.url_video) formData.append("url_video", currentUrls.url_video);

    // Log FormData content correctly
    for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
    }
        
    return await axiosCustom.put(`/api/songs/${id}/`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
};

export const deleteSong = async (id) => {
    return await axiosCustom.delete(`/api/songs/${id}/`);
};
