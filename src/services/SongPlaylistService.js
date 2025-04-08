import axiosCustom from "../utils/axiosCustom";

export const getSongFromPlaylistService = async (playlistID) => {
    const res = await axiosCustom.get(`/song_playlist/${playlistID}/songs/`);
    return res;
}