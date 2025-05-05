import { useState, useEffect } from "react";
import { searchSongs } from "../../../services/SongsService";
import { getSongsFromPlaylistService, deleteSongFromPlaylistService, addSongToPlaylistService } from "../../../services/SongPlaylistService";
import { IconChevronRight, IconMusic, IconPlayerPlayFilled, IconList, IconDotsVertical, IconClockHour3, IconSearch, IconX } from "@tabler/icons-react";
import Song from "./_Song";
import SearchedSong from "./_SearchedSong";
import EditPlaylistForm from "./_EditPlaylistForm";
import { usePlayList } from "../../../utils/playlistContext";
import { IconTrash } from "@tabler/icons-react";
import { deletePlaylistService } from "../../../services/playlistService";

const MyLibrary = ({ playlist, setCurrentView }) => {
    const [available, setAvailable] = useState(false);
    const [songs, setSongs] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [referesh, setRefresh] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const { playlists, setPlaylists, refreshKeyPlayLists, setRefreshKeyPlayLists } = usePlayList();
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Lấy thông tin người dùng từ localStorage khi component mount
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    useEffect(() => {
        const fetchSongs = async () => {
            if (!playlist || !playlist.id) return;
            try {
                const formData = {
                    token: localStorage.getItem("access_token"),
                };
                const response = await getSongsFromPlaylistService(playlist.id, formData);
                setSongs(response.data.songs);
            } catch (error) {
                console.error("Error fetching songs:", error);
            }
        };

        fetchSongs();
    }, [playlist, referesh]);

    const handleSearch = async (e) => {
        if (e.key === "Enter") {
            try {
                const response = await searchSongs(searchQuery);
                setSearchResults(response.data.results || []);
            } catch (error) {
                console.error("Error searching songs:", error);
                setSearchResults([]); // Xóa kết quả nếu lỗi
            }
        }
    };

    const deleteSong = async (songId) => {
        try {
            await deleteSongFromPlaylistService(playlist.id, songId);
            setRefreshKeyPlayLists(Date.now());
        } catch (error) {
            console.error("Lỗi khi xóa bài hát:", error);
        }
    };

    const addSongToPlaylist = async (songId) => {
        try {
            const formData = {
                playlist_id: playlist.id,
                song_id: songId,
                token: localStorage.getItem("access_token"),
            };
            await addSongToPlaylistService(formData); // Thêm bài hát vào playlist
            alert("Thêm bài hát vào playlist thành công!");

            setRefresh(Date.now()); // Cập nhật lại danh sách bài hát
            setRefreshKeyPlayLists(Date.now());
        } catch (error) {
            console.error("Error adding song to playlist:", error);
        }
    };

    const removeSearch = () => {
        setSearchResults([]);
        setSearchQuery("");
    };

    const handleRemove = async () => {
        try {
            const isConfirmed = confirm("Bạn có chắc chắn xóa danh sách này không?");
            if (isConfirmed) {
                const formData = {
                    token: localStorage.getItem("access_token")
                }
                await deletePlaylistService(playlist.id, formData);
                
                alert("Xóa thành công");
                setRefreshKeyPlayLists(Date.now());
                setCurrentView("main")
            }
        } catch (error) {
            console.error("Error deleting playlist:", error);
            alert("Đã xảy ra lỗi khi xóa danh sách");
        }
    };

    return (
        <div className="bg-[#131313] text-white flex-1 mr-2 rounded-lg overflow-y-auto">
            <div className="flex flex-col">
                <div className="flex items-end gap-4 p-4 pb-6 bg-gradient-to-b from-[#666666] to-[#595959]">
                    <div className="w-[232px] h-[232px] bg-gradient-to-br from-[#333333] to-[#121212] flex items-center justify-center">
                        {playlist.image ? (
                            <img src={playlist.image} alt={playlist.title} className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full bg-gradient-to-br from-[#333333] to-[#121212] flex items-center justify-center">
                                <IconMusic stroke={2} className="w-24 h-24 text-gray-400" />
                            </div>
                        )}
                    </div>
                    <div className="flex flex-col gap-4 cursor-pointer" onClick={() => !playlist.is_liked_song && setIsEditing(true)}>
                        <div>
                            <h1 className="text-5xl font-bold mt-2 cursor-pointer">{playlist.title}</h1>
                        </div>
                        <h3 className="text-sm text-gray-400">{playlist.description}</h3>
                        {user && (
                            <div className="flex items-center gap-2">
                                <img src={user.avatar} alt="User Avatar" className="w-6 h-6 rounded-full" />
                                <span className="text-sm font-semibold">{user.first_name}</span>
                            </div>
                        )}
                    </div>
                    <div className="flex flex-1 justify-end">
                        <IconTrash stroke={2} className="cursor-pointer" onClick={handleRemove} />
                    </div>
                </div>
                <div className="flex flex-row justify-between items-center mx-6">
                    <div className="flex flex-row items-center">
                        {songs.length > 0 ? (
                            <div className="mr-4 bg-green-500 cursor-pointer rounded-full group-hover:block transition-all duration-300 hover:scale-110 hover:bg-green-400">
                                <IconPlayerPlayFilled className="size-12 p-3 text-black" />
                            </div>
                        ) : (
                            <IconDotsVertical stroke={2} className="size-8" />
                        )}
                    </div>
                    <div className="flex flex-row items-center py-8">
                        <h3 className="text-md text-gray-300 mr-2">Danh sách</h3>
                        <IconList stroke={2} className="size-5" />
                    </div>
                </div>
                <div className="mx-12 mb-4">
                    <div className="grid grid-cols-[16px_4fr_2fr_1fr] gap-4 text-sm text-gray-400 border-b border-gray-700/50 pb-2">
                        <div>#</div>
                        <div>Tiêu đề</div>
                        <div>Album</div>
                        <div className="flex justify-end">
                            <IconClockHour3 stroke={2} className="w-5 h-5" />
                        </div>
                    </div>

                    {/* Hiển thị danh sách bài hát */}
                    {songs.length > 0 ? (
                        songs.map((song, index) => <Song key={song.id} song={song} playlist={playlist} deleteSong={deleteSong} songs={songs} index={index} />)
                    ) : (
                        <div className="text-gray-400 mt-4">Chưa có bài hát nào trong playlist này</div>
                    )}
                </div>
                {/* Search Bar */}
                <div className="mx-6 border-t border-t-gray-700/50 pt-5">
                    <h3 className="text-2xl font-bold">Hãy cùng tìm nội dung cho danh sách phát của bạn</h3>
                    <div className="flex flex-row justify-between items-center">
                        <div className="w-full max-w-[364px] relative mt-4">
                            <input
                                type="text"
                                placeholder="Tìm bài hát và tập podcast"
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyDown={handleSearch}
                                value={searchQuery}
                                className="w-full bg-[#242424] px-10 py-2 rounded-full text-sm placeholder:text-gray-400"
                            />
                            <IconSearch className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        </div>
                        <IconX className="size-6 text-gray-400 cursor-pointer" onClick={removeSearch} />
                    </div>
                </div>
                {/* Nơi hiện các bài hát để thêm vào play list */}
                <div className="pb-6 mx-4">
                    {searchResults.length > 0 && searchResults.map((song, index) => <SearchedSong key={index} song={song} playlist={playlist} addSongToPlaylist={addSongToPlaylist} />)}
                </div>
            </div>
            {isEditing && <EditPlaylistForm playlist={playlist} onClose={() => setIsEditing(false)} setCurrentView={setCurrentView} />}
        </div>
    );
};

export default MyLibrary;
