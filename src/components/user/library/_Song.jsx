import { useState, useEffect } from "react";
import { deleteSongFromPlaylistService } from "../../../services/SongPlaylistService";
import { useAudio } from "../../../utils/audioContext";
import ContextMenu from "./_ContextMenu";


const Song = ({ song, playlist, deleteSong, songs, index }) => {
    const [contextMenu, setContextMenu] = useState(null);
    const { setCurrentSong, currentSong, audio, setAudio, setIsPlaying, volume, setNewPlaylist } = useAudio();

    const onPlaySong = () => {        
        setNewPlaylist(songs, index);
    };

    // Xử lý sự kiện chuột phải
    const handleContextMenu = (e) => {
        e.preventDefault();
        setContextMenu({
            x: e.clientX,
            y: e.clientY,
        });
    };

    // Đóng context menu
    const handleCloseContextMenu = () => {
        setContextMenu(null);
    };

    // Xử lý khi click ra ngoài để đóng menu
    const handleClickOutside = () => {
        if (contextMenu) {
            handleCloseContextMenu();
        }
    };

    // Gắn sự kiện click ngoài vào document
    useEffect(() => {
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [contextMenu]);

    return (
        <div
            className="grid grid-cols-[16px_4fr_2fr_1fr] gap-4 items-center hover:bg-white/10 rounded-md p-2 group mt-4 cursor-pointer"
            onContextMenu={handleContextMenu}
            onClick={onPlaySong}
        >
            <div className="text-gray-400">{index + 1}</div>
            <div className="flex items-center gap-3">
                <img src={song.image} alt={song.song_name} className="w-10 h-10" />
                <div>
                    <p className="text-white">{song.song_name}</p>
                    <p className="text-sm text-gray-400">{song.singer_name}</p>
                </div>
            </div>
            <div className="text-gray-400">{song.song_name}</div>
            <div className="text-gray-400 text-right">{song.duration ? song.duration : "3:09"}</div>

            {/* Hiển thị context menu nếu có */}
            {contextMenu && (
                <ContextMenu
                    x={contextMenu.x}
                    y={contextMenu.y}
                    deleteSong={deleteSong}
                    song={song}
                    onClose={handleCloseContextMenu}
                />
            )}
        </div>
    );
};

export default Song;