import { createContext, useContext, useState, useEffect } from "react";

// Tạo Context
const AudioContext = createContext();

// Provider Component
export const AudioProvider = ({ children }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentSong, setCurrentSong] = useState(null);
    const [audio, setAudio] = useState(null);
    const [isMute, setIsMute] = useState(false);
    const [volume, setVolume] = useState(50);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    // Thêm state cho playlist và chỉ số bài hát hiện tại
    const [playlist, setPlaylist] = useState([]);
    const [currentSongIndex, setCurrentSongIndex] = useState(-1);

    // Hàm để phát/tạm dừng bài hát
    const togglePlay = () => {
        if (audio) {
            if (isPlaying) {
                audio.pause();
                setIsPlaying(false);
            } else {
                audio.play().catch((error) => console.error("Playback failed:", error));
                setIsPlaying(true);
            }
        }
    };

    // Hàm để set thời gian phát
    const setPlaybackTime = (timeInSeconds) => {
        if (audio) {
            audio.currentTime = timeInSeconds;
            setCurrentTime(Math.round(timeInSeconds));
        }
    };

    // Hàm để phát bài hát tiếp theo
    const playNextSong = () => {
        if (playlist.length === 0) return;

        let nextIndex = currentSongIndex + 1;
        if (nextIndex >= playlist.length) {
            nextIndex = 0; // Quay lại bài đầu tiên nếu hết danh sách
        }

        setCurrentSongIndex(nextIndex);
        setCurrentSong(playlist[nextIndex]);
    };

    // Hàm để thêm danh sách bài hát
    const setNewPlaylist = (newPlaylist, startIndex = 0) => {
        if (audio) {
            audio.pause(); // Dừng bài hát hiện tại
            setIsPlaying(false); // Cập nhật trạng thái phát
        }
        setPlaylist(newPlaylist);
        if (newPlaylist.length > 0) {
            
            setCurrentSongIndex(startIndex);
            setCurrentSong(newPlaylist[startIndex]);
        } else {
            setCurrentSongIndex(-1);
            setCurrentSong(null);
        }
    };

    // Tạo audio mới khi bài hát thay đổi
    useEffect(() => {
        if (currentSong) {
            if (audio) {
                audio.pause();
            }
            const newAudio = new Audio(currentSong.url_audio);
            newAudio.volume = 0.5;
            newAudio.play();
            setAudio(newAudio);
            setIsPlaying(true);
        }
    }, [currentSong]);

    // Lấy duration của bài hát
    useEffect(() => {
        if (audio) {
            const updateDuration = () => setDuration(Math.round(audio.duration));
            audio.addEventListener("loadedmetadata", updateDuration);
            if (audio.duration) {
                setDuration(Math.round(audio.duration));
            }
            return () => audio.removeEventListener("loadedmetadata", updateDuration);
        }
    }, [audio]);

    // Cập nhật currentTime khi audio đang phát
    useEffect(() => {
        if (audio) {
            const updateTime = () => setCurrentTime(Math.round(audio.currentTime));
            audio.addEventListener("timeupdate", updateTime);
            return () => audio.removeEventListener("timeupdate", updateTime);
        }
    }, [audio]);

    // Cập nhật volume và mute
    useEffect(() => {
        if (audio) {
            audio.volume = isMute ? 0 : volume / 100;
        }
    }, [volume, isMute, audio]);

    useEffect(() => {
        if(currentTime === duration) {
            playNextSong(); // Tự động phát bài tiếp theo khi bài hiện tại kết thúc
        }
    }, [currentTime]);

    return (
        <AudioContext.Provider
            value={{
                isPlaying,
                setIsPlaying,
                currentSong,
                setCurrentSong,
                audio,
                setAudio,
                togglePlay,
                isMute,
                setIsMute,
                volume,
                setVolume,
                currentTime,
                setPlaybackTime,
                duration,
                setDuration,
                playlist,
                setNewPlaylist,
                currentSongIndex,
                playNextSong,
            }}
        >
            {children}
        </AudioContext.Provider>
    );
};

// Custom Hook để sử dụng Context
export const useAudio = () => {
    const context = useContext(AudioContext);
    if (!context) {
        throw new Error("useAudio must be used within an AudioProvider");
    }
    return context;
};