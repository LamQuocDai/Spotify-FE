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
    const [currentTime, setCurrentTime] = useState(0); // Biến lưu giây đang phát
    const [duration, setDuration] = useState(0); // Biến lưu tổng thời gian bài hát

    // Hàm để phát/tạm dừng bài hát
    const togglePlay = () => {
        if (audio) {
            if (isPlaying) {
                audio.pause();
                setIsPlaying(false);
            } else {
                audio.play();
                setIsPlaying(true);
            }
        }
    };
    // Hàm để set thời gian phát (tính bằng giây)
    const setPlaybackTime = (timeInSeconds) => {
        if (audio) {
            audio.currentTime = timeInSeconds;
            setCurrentTime(Math.round(timeInSeconds));
        }
    };
    // Lấy duration của bài hát khi audio sẵn sàng
    useEffect(() => {
        if (audio) {
            const updateDuration = () => setDuration(Math.round(audio.duration));
            audio.addEventListener("loadedmetadata", updateDuration);
            // Nếu duration đã có sẵn (trong một số trường hợp)
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

    useEffect(() => {
        if (audio) {
            audio.volume = isMute ? 0 : volume / 100;
        }
    }, [volume, isMute, audio]);

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
