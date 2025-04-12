import { useState, useEffect } from "react";
import { getSongsFromPlaylistService } from "../../../services/SongPlaylistService";
import {
  IconChevronRight,
  IconMusic,
  IconPlayerPlayFilled,
  IconList,
  IconDotsVertical,
  IconClockHour3,
} from "@tabler/icons-react";

const Song = ({ song, index }) => {
  return (
    <div className="grid grid-cols-[16px_4fr_2fr_1fr] gap-4 items-center hover:bg-white/10 rounded-md p-2 group mt-4">
      <div className="text-gray-400">{index + 1}</div>
      <div className="flex items-center gap-3">
        <img src={song.image} alt={song.song_name} className="w-10 h-10" />
        <div>
          <p className="text-white">{song.song_name}</p>
          <p className="text-sm text-gray-400">{song.singer_name}</p>
        </div>
      </div>
      <div className="text-gray-400">{song.song_name}</div>
      <div className="text-gray-400 text-right">
        {song.duration ? song.duration : "3:09"}
      </div>
    </div>
  );
};
const SearchedSong = ({ songs }) => {
  return (
    <div className="flex flex-row items-center mx-6 mt-4">
      <img
        src="https://i.scdn.co/image/ab67616d00001e02a1c0bb7c9e7c0c7d7c0c5f6a"
        alt="Danh Doi"
        className="w-12 h-12"
      />
      <div className="flex flex-col ml-3">
        <span className="text-white font-bold">Đánh Đổi</span>
        <span className="text-sm text-gray-400">Obito, Shiki, RPT MCK</span>
      </div>
      <button className="ml-auto px-4 py-2 rounded-full border border-gray-500 bg-transparent text-white text-sm hover:border-white transition-colors">
        Thêm
      </button>
    </div>
  );
};

const SearchedArtist = ({ artist }) => {
  return (
    <div className="flex flex-row items-center mx-6 mt-6">
      <img
        src="https://i.scdn.co/image/ab67616100005174e6f407c7f3a0ec98845e4431"
        alt="Den"
        className="w-12 h-12 rounded-full"
      />
      <div className="flex flex-col ml-3">
        <span className="text-white font-bold">Đen</span>
        <span className="text-sm text-gray-400">Nghệ sĩ</span>
      </div>
      <IconChevronRight
        stroke={2}
        className="ml-auto size-10 text-gray-500 cursor-pointer"
      />
    </div>
  );
};

const MyLibrary = ({ playlist }) => {
  const [available, setAvailable] = useState(false);
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSongs = async () => {
      if (!playlist || !playlist.id) return;

      setLoading(true);
      try {
        const response = await getSongsFromPlaylistService(playlist.id);
        console.log(response);

        setSongs(response.data.songs);
      } catch (error) {
        console.error("Error fetching songs:", error);
        if (error.response && error.response.status === 401) {
          console.log("User not authenticated. Please log in.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchSongs();
  }, [playlist]);

  return (
    <div className="bg-[#131313] text-white h-[78vh] flex-1 mr-2 rounded-lg overflow-y-auto">
      <div className="flex flex-col">
        {/* Header */}
        <div className="flex items-end gap-4 p-4 pb-6 bg-gradient-to-b from-[#666666] to-[#595959]">
          <div className="w-[232px] h-[232px] bg-gradient-to-br from-[#333333] to-[#121212] flex items-center justify-center">
            <IconMusic stroke={2} className="w-24 h-24 text-gray-400" />
          </div>
          <div className="flex flex-col gap-6">
            <div>
              <p className="text-sm">Playlist</p>
              <h1 className="text-5xl font-bold mt-2">{playlist.title}</h1>
            </div>
            <div className="flex items-center gap-2">
              <img
                src="/path-to-avatar"
                alt="User Avatar"
                className="w-6 h-6 rounded-full"
              />
              <span className="text-sm font-semibold">Huỳnh Ngọc Triều</span>
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-between items-center mx-6">
          <div className="flex flex-row items-center">
            {available && (
              <div className="mr-4 bg-green-500 rounded-full group-hover:block transition-all duration-300 hover:scale-110 hover:bg-green-400">
                <IconPlayerPlayFilled className="size-12 p-3 text-black" />
              </div>
            )}
            <IconDotsVertical stroke={2} className="size-8" />
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
          {loading ? (
            <div className="text-gray-400 mt-4">Đang tải...</div>
          ) : songs.length > 0 ? (
            songs.map((song, index) => (
              <Song key={song.id} song={song} index={index} />
            ))
          ) : (
            <div className="text-gray-400 mt-4">
              Chưa có bài hát nào trong playlist này
            </div>
          )}
        </div>
        {/* Search Bar */}
        <div className="mx-6 border-t border-t-gray-700/50 pt-5">
          <h3 className="text-2xl font-bold">
            Hãy cùng tìm nội dung cho danh sách phát của bạn
          </h3>
          <div className="flex flex-row justify-between items-center">
            <div className="w-full max-w-[364px] relative mt-4">
              <input
                type="text"
                placeholder="Tìm bài hát và tập podcast"
                className="w-full bg-[#242424] px-10 py-2 rounded-full text-sm placeholder:text-gray-400"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6 text-gray-400 cursor-pointer"
            >
              <path
                fillRule="evenodd"
                d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
        {/* Nơi hiện các bài hát để thêm vào play list */}
        <div className="pb-6 mx-4">
          <SearchedArtist />
          <SearchedSong />
        </div>
      </div>
    </div>
  );
};

export default MyLibrary;
