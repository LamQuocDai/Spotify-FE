import React, { useEffect, useState } from "react";
import { getAllSongs } from "../../services/SongsService";
import { getAllGenres } from "../../services/genresService";
import Song from "./_Song";

const MainContent = ({ setCurrentView, setListSongsDetail }) => {
    const [allSongs, setAllSongs] = useState([]);
    const [contextMenu, setContextMenu] = useState(null);
    const [genres, setGenres] = useState([]);

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

    useEffect(() => {
        const fetchAllSongs = async () => {
            try {
                const response = await getAllSongs();
                setAllSongs(response.data.results);
                const genresResponse = await getAllGenres();                
                setGenres(genresResponse.data.results);
            } catch (error) {
                console.error("Error fetching trending songs:", error);
            }
        };

        fetchAllSongs();
    }, []);

    const handleAllSongs = (songs) => {
        setListSongsDetail(songs);
        setCurrentView("listSongs");
    };

    return (
        <div className="bg-[#131313] text-white p-4 mr-2 rounded-lg flex-1 overflow-y-auto space-y-4">
            <div>
                <div className="flex flex-row justify-between">
                    <h2 className="text-2xl font-bold mb-6 cursor-pointer hover:underline">Tất cả bài hát</h2>
                    <span className="text-sm font-bold text-gray-400 cursor-pointer hover:underline" onClick={() => handleAllSongs(allSongs)}>
                        Hiện tất cả
                    </span>
                </div>
                <div className="flex flex-row gap-4 overflow-x-auto pb-4 scrollbar-none">
                    {allSongs.map((song) => (
                        <Song key={song.id} song={song} contextMenu={contextMenu} setContextMenu={setContextMenu} handleCloseContextMenu={handleCloseContextMenu} list={allSongs} />
                    ))}
                </div>
            </div>
            {genres.length > 0 &&
                genres.map((genre) => (
                    <>
                        <div className="flex flex-row justify-between">
                            <h2 className="text-2xl font-bold mb-6 cursor-pointer hover:underline">{genre.name}</h2>
                            <span className="text-sm font-bold text-gray-400 cursor-pointer hover:underline" onClick={() => handleAllSongs(genre.songs)}>
                                Hiện tất cả
                            </span>
                        </div>
                        <div className="flex flex-row gap-4 overflow-x-auto pb-4 scrollbar-none">
                            {genre.songs.map((song) => (
                                <Song key={song.id} song={song} contextMenu={contextMenu} setContextMenu={setContextMenu} handleCloseContextMenu={handleCloseContextMenu} list={genre.songs} width={150} />
                            ))}
                        </div>
                    </>
                ))}
        </div>
    );
};

export default MainContent;
