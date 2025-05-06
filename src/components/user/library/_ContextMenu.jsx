import React, { useEffect, useState } from "react";
import { createPlaylistService, getUserPlaylistByIdService, searchPlaylistsService, getPlaylistByIdService } from "../../../services/playlistService";
import { addSongToPlaylistService, addToLikedSongsService } from "../../../services/SongPlaylistService";
import { usePlayList } from "../../../utils/playlistContext";
import { add } from "lodash";

const ContextMenu = ({ x, y, deleteSong, song, onClose }) => {
    const [showPlaylists, setShowPlaylists] = useState(false);
    const { playlists, setPlaylists, setRefreshKeyPlayLists } = usePlayList();

    // Placeholder function to add song to playlist
    const addSongToPlaylist = async (playlistId) => {
        try {
            console.log("Adding song to playlist:", playlistId, song.id);

            const formData = {
                playlist_id: playlistId,
                song_id: song.id,
                token: localStorage.getItem("access_token"),
            };
            await addSongToPlaylistService(formData); // Thêm bài hát vào playlist
            setRefreshKeyPlayLists(Date.now()); // Cập nhật lại danh sách bài hát
            alert("Thêm bài hát vào playlist thành công!");

        } catch (error) {
            console.error("Error adding song to playlist:", error);
        }
    };
    const addSongLikedSong = async () => {
        try {
            const formData = {
                song_id: song.id,
            };
            await addToLikedSongsService(formData); // Thêm bài hát vào playlist
            setRefreshKeyPlayLists(Date.now()); // Cập nhật lại danh sách bài hát

            alert("Thêm bài hát vào danh sách yêu thích thành công!");

        } catch (error) {
            alert("Thêm bài hát vào danh sách yêu thích thất bại!");
            console.error("Error adding song to liked songs:", error);
        }
    };

    return (
        <div className="context-menu absolute bg-[#242424] rounded-md shadow-lg border border-gray-700 z-50" style={{ top: y, left: x, minWidth: "150px" }} onClick={(e) => e.stopPropagation()}>
            <button className="block w-full text-left px-4 py-2 text-white hover:bg-white/10" onClick={addSongLikedSong}>
                Thêm vào Liked Songs
            </button>
            <div className="relative" onMouseEnter={() => setShowPlaylists(true)} onMouseLeave={() => setShowPlaylists(false)}>
                <button className="block w-full text-left px-4 py-2 text-white hover:bg-white/10">Thêm vào danh sách phát</button>
                {showPlaylists && (
                    <div className="absolute left-full top-0 mt-1 bg-[#242424] rounded-md shadow-lg z-50 w-48">
                        {playlists.length > 0 ? (
                            playlists.map((playlist) => (
                                <button
                                    key={playlist.id}
                                    className="block w-full text-left px-4 py-2 text-white hover:bg-white/10"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        addSongToPlaylist(playlist.id);
                                    }}
                                >
                                    {playlist.title}
                                </button>
                            ))
                        ) : (
                            <div className="px-4 py-2 text-gray-400">No playlists available</div>
                        )}
                    </div>
                )}
            </div>
            {deleteSong && (
                <button className="block w-full text-left px-4 py-2 text-white hover:bg-white/10" onClick={deleteSong}>
                    Xóa khỏi danh sách phát
                </button>
            )}
        </div>
    );
};
export default ContextMenu;
