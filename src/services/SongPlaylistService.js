import axiosCustom from "../utils/axiosCustom";

export const addSongToPlaylistService = async (playlistId, songId) => {
    const formData = {
        playlist_id: playlistId,
        song_id: songId,
    };
    return await axiosCustom.post("/song_playlist/create/", formData);
};

export const getSongsFromPlaylistService = async (playlistId) => {
    return await axiosCustom.get(`/song_playlist/${playlistId}/songs/`);
};

export const searchSongsFromPlaylistService = async (playlistId, query) => {
    return await axiosCustom.get(`/song_playlist/${playlistId}/songs/search/?query=${query}`);
};

export const deleteSongFromPlaylistService = async (playlistId, songId) => {
    return await axiosCustom.delete(`/song_playlist/${playlistId}/songs/${songId}/delete/`);
};

export const viewCreditsService = async (songId) => {
    return await axiosCustom.get(`/song_playlist/${songId}/`);
};

export const goToArtistService = async (userId) => {
    return await axiosCustom.get(`/song_playlist/${userId}/delete/`);
};

// LikedSong-related services
export const addToLikedSongsService = async (songId) => {
    const formData = {
        song_id: songId,
    };
    return await axiosCustom.post("/song_playlist/liked_songs/add/", formData);
};

export const getLikedSongsService = async () => {
    return await axiosCustom.get("/song_playlist/liked_songs/");
};

export const searchLikedSongsService = async (query) => {
    return await axiosCustom.get(`/song_playlist/liked_songs/search/?query=${query}`);
};

export const removeFromLikedSongsService = async (songId) => {
    return await axiosCustom.delete(`/song_playlist/liked_songs/${songId}/remove/`);
};