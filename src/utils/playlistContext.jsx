import { createContext, useContext, useState, useEffect } from "react";

// Tạo Context
const AudioContext = createContext();

// Provider Component
export const PlayListProvider = ({ children }) => {
    const [playlists, setPlaylists] = useState([]);
    const [refreshKeyPlayLists, setRefreshKeyPlayLists] = useState("");
    return (
        <AudioContext.Provider
            value={{
                playlists,
                setPlaylists,
                refreshKeyPlayLists,
                setRefreshKeyPlayLists
            }}
        >
            {children}
        </AudioContext.Provider>
    );
};

// Custom Hook để sử dụng Context
export const usePlayList = () => {
    const context = useContext(AudioContext);
    if (!context) {
        throw new Error("useAudio must be used within an AudioProvider");
    }
    return context;
};