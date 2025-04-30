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