import { useEffect, useState } from "react";
import { useAudio } from "../../utils/audioContext";
import { IconPlayerPlayFilled } from "@tabler/icons-react";
// import { getUserPlaylistService } from "../../services/playlistService";
import ContextMenu from "./library/_ContextMenu";

const Song = ({ song, contextMenu, setContextMenu, handleCloseContextMenu, list }) => {
    const { setCurrentSong, currentSong, audio, setAudio, setIsPlaying, setNewPlaylist } = useAudio();

    const playAudio = () => {
        setNewPlaylist(
            list,
            list.findIndex((s) => s.id === song.id)
        );
    };

    // Handle right-click to show context menu
    const handleContextMenu = (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log("Opening context menu for song:", song.id);
        setContextMenu({
            x: e.clientX,
            y: e.clientY,
            songId: song.id,
        });
    };

    return (
        <div className="group flex-shrink-0 hover:bg-gradient-to-b w-[150px] from-[#131313] to-[#272727] text-white cursor-pointer  p-3 rounded-md" onContextMenu={handleContextMenu}>
            <div className="relative">
                <img className="h-[180px] w-[180px] rounded-lg object-cover object-center" src={song.image} alt={song.song_name} />
                <button
                    className="absolute bottom-2 right-2 bg-green-500 rounded-full hidden group-hover:block transition-all duration-300 hover:scale-110 hover:bg-green-400"
                    onClick={(e) => {
                        e.stopPropagation();
                        playAudio();
                    }}
                >
                    <IconPlayerPlayFilled className="size-12 p-3 text-black" />
                </button>
            </div>
            <div className="mt-2">
                <h3 className="text-base font-medium truncate">{song.song_name}</h3>
                <span className="text-sm text-gray-400">{song.singer_name}</span>
            </div>

            {/* Display context menu if active for this song */}
            {contextMenu && contextMenu.songId === song.id && (
                <ContextMenu
                    x={contextMenu.x}
                    y={contextMenu.y}
                    song={song}
                    onClose={() => {
                        handleCloseContextMenu();
                    }}
                />
            )}
        </div>
    );
};

export default Song;
