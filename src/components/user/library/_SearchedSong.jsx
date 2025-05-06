import React, { use, useEffect, useState } from "react";
import { getSongsFromPlaylistService } from "../../../services/SongPlaylistService.js";
import { IconCircleDashedCheck } from "@tabler/icons-react";

const SearchedSong = ({ song, playlist, addSongToPlaylist }) => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const fetchSongs = async () => {
            if (!playlist || !playlist.id) return;
            try {
                const response = await getSongsFromPlaylistService(playlist.id);                
                setVisible(response.data.songs.some((s) => s.id === song.id));
            } catch (error) {
                console.error("Error fetching songs:", error);
            }
        };

        fetchSongs();
    },[]);

    return (
        <div className="flex flex-row items-center mx-6 mt-4">
            <img src={song.image} alt="Danh Doi" className="w-12 h-12" />
            <div className="flex flex-col ml-3">
                <span className="text-white font-bold">{song.song_name}</span>
                <span className="text-sm text-gray-400">{song.singer_name}</span>
            </div>
            {visible ? (
                <IconCircleDashedCheck className="ml-auto text-green-500" size={24}/>
            ) : (
                <button onClick={() => addSongToPlaylist(song.id)} className="ml-auto px-4 py-2 rounded-full border border-gray-500 bg-transparent text-white text-sm hover:border-white transition-colors">
                    Thêm
                </button>
            )}
        </div>
    );
};
export default SearchedSong;
