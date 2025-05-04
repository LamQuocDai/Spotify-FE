import { useEffect, useState } from "react";
import { useAudio } from "../../utils/audioContext";
import { IconPlayerPlayFilled } from "@tabler/icons-react";
// import { getUserPlaylistService } from "../../services/playlistService";

// ContextMenu component
const ContextMenu = ({ x, y, song, onClose }) => {
  const [showPlaylists, setShowPlaylists] = useState(false);
  const [playlists, setPlaylists] = useState([]);

  // Placeholder function to add song to playlist
  const addSongToPlaylist = (playlistId) => {
    console.log(`Adding song ${song.id} to playlist ${playlistId}`);
    onClose();
  };

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const response = await getUserPlaylistService();
        setPlaylists(response.data.playlists.reverse());
      } catch (error) {
        console.error("Error fetching playlists:", error);
      }
    };
    fetchPlaylists();
  }, []);

  return (
    <div
      className="context-menu absolute bg-[#242424] rounded-md shadow-lg border border-gray-700 z-50"
      style={{ top: y, left: x, minWidth: "150px" }}
      onClick={(e) => e.stopPropagation()}
    >
      <div
        className="relative"
        onMouseEnter={() => setShowPlaylists(true)}
        onMouseLeave={() => setShowPlaylists(false)}
      >
        <button className="block w-full text-left px-4 py-2 text-white hover:bg-white/10">
          Thêm vào danh sách phát
        </button>
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
              <div className="px-4 py-2 text-gray-400">
                No playlists available
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const Song = ({
  song,
  contextMenu,
  setContextMenu,
  handleCloseContextMenu,
  list,
}) => {
  const {
    setCurrentSong,
    currentSong,
    audio,
    setAudio,
    setIsPlaying,
    setNewPlaylist,
  } = useAudio();

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
    <div
      className="group flex-shrink-0 hover:bg-gradient-to-b w-[150px] from-[#131313] to-[#272727] text-white cursor-pointer  p-3 rounded-md"
      onContextMenu={handleContextMenu}
    >
      <div className="relative">
        <img
          className="h-[180px] w-[180px] rounded-lg object-cover object-center"
          src={song.image}
          alt={song.song_name}
        />
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
            console.log("Closing context menu for song:", song.id);
            handleCloseContextMenu();
          }}
        />
      )}
    </div>
  );
};

export default Song;
