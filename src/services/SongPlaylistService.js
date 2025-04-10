import axiosCustom from "../utils/axiosCustom";

export const addSongToPlaylistService = async (playlistId, songId) => {
    const formData = {
        playlist_id: playlistId,
        song_id: songId,
    };
    const res = await axiosCustom.post("/song_playlist/create/", formData);
    return res;
};

export const getSongsFromPlaylistService = async (playlistId) => {
    const res = await axiosCustom.get(`/song_playlist/${playlistId}/songs/`);
    return res;
};

export const searchSongsFromPlaylistService = async (playlistId, query) => {
    const res = await axiosCustom.get(`/song_playlist/${playlistId}/songs/search/?query=${query}`);
    return res;
};

export const deleteSongFromPlaylistService = async (playlistId, songId) => {
    const res = await axiosCustom.delete(`/song_playlist/${playlistId}/songs/${songId}/delete/`);
    return res;
};

export const viewCreditsService = async (songId) => {
    const res = await axiosCustom.get(`/song_playlist/${songId}/`);
    return res;
};

export const goToArtistService = async (userId) => {
    const res = await axiosCustom.get(`/song_playlist/${userId}/delete/`);
    return res;
};

// LikedSong-related services
export const addToLikedSongsService = async (songId) => {
    const formData = {
        song_id: songId,
    };
    const res = await axiosCustom.post("/song_playlist/liked_songs/add/", formData);
    return res;
};

export const getLikedSongsService = async () => {
    const res = await axiosCustom.get("/song_playlist/liked_songs/");
    return res;
};

export const searchLikedSongsService = async (query) => {
    const res = await axiosCustom.get(`/song_playlist/liked_songs/search/?query=${query}`);
    return res;
};

export const removeFromLikedSongsService = async (songId) => {
    const res = await axiosCustom.delete(`/song_playlist/liked_songs/${songId}/remove/`);
    return res;
};