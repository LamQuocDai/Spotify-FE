import React, { useEffect, useState } from "react";
import Song from "./_Song";
import { useAudio } from "../../utils/audioContext.jsx";

const ListSongs = ({ listSongs }) => {
    const [contextMenu, setContextMenu] = useState(null);
    const { currentSong, songDescriptionAvailable } = useAudio();


    // Close context menu
    const handleCloseContextMenu = () => {
        setContextMenu(null);
    };

    // Handle click outside (left or right click) to close context menu
    const handleClickOutside = (e) => {
        if (contextMenu) {
            // Only close if the click is outside the context menu
            const contextMenuElement = document.querySelector(".context-menu");
            if (contextMenuElement && !contextMenuElement.contains(e.target)) {
                handleCloseContextMenu();
            }
        }
    };

    // Add and remove click outside eventTheresult event listeners
    useEffect(() => {
        document.addEventListener("click", handleClickOutside);
        document.addEventListener("contextmenu", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
            document.removeEventListener("contextmenu", handleClickOutside);
        };
    }, [contextMenu]);

    return (
        <div className="bg-[#131313] text-white flex-1 mr-2 rounded-lg overflow-y-auto">
            <h3 className="p-3 font-bold text-2xl">{listSongs.title}</h3>
            <div className={songDescriptionAvailable ? "grid grid-cols-4 gap-4 p-4" : "grid grid-cols-6 gap-4 p-4"}>
                {listSongs.songs.length > 0 &&
                    listSongs.songs.map((song, index) => (
                        <Song key={song.id} song={song} contextMenu={contextMenu} setContextMenu={setContextMenu} handleCloseContextMenu={handleCloseContextMenu} list={listSongs} />
                    ))}
            </div>
        </div>
    );
};
export default ListSongs;
