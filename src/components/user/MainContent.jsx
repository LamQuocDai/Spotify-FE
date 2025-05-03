import React, { useEffect, useState } from "react";
import { IconPlayerPlayFilled } from "@tabler/icons-react";
import { getAllSongs } from "../../services/SongsService";
import { useAudio } from "../../utils/audioContext";

const Song = ({ song }) => {
    const { setCurrentSong, currentSong, audio, setAudio, setIsPlaying } = useAudio();
    
    const playAudio = () => {
        setCurrentSong(song);
    };

    useEffect(() => {
        if (currentSong && currentSong.id === song.id) {
            if (audio) {
                audio.pause();
            }
            const newAudio = new Audio(song.url_audio);
            newAudio.volume = 0.5; 
            newAudio.play();
            setAudio(newAudio);
            setIsPlaying(true);
        }
    }, [currentSong]);

    return (
        <div className="group flex-shrink-0 hover:bg-gradient-to-b from-[#131313] to-[#272727] text-white cursor-pointer w-[160px] p-3 rounded-md">
            <div className="relative">
                <img
                    className="h-[180px] w-[180px] rounded-lg object-cover object-center"
                    src={song.image}
                    alt=""
                />
                <button
                    className="absolute bottom-2 right-2 bg-green-500 rounded-full hidden group-hover:block transition-all duration-300 hover:scale-110 hover:bg-green-400"
                    onClick={playAudio}
                >
                    <IconPlayerPlayFilled className="size-12 p-3 text-black" />
                </button>
            </div>
            <div className="mt-2 w-full">
                <h3 className="text-base font-medium truncate">{song.song_name}</h3>
                <span className="text-sm text-gray-400">{song.singer_name}</span>
            </div>
        </div>
    );
};

const Articsle = () => {
    return (
        <div className="group flex-shrink-0 text-white hover:bg-gradient-to-b from-[#131313] to-[#272727] cursor-pointer w-[180px] p-3 rounded-md">
            <div className="relative">
                <img
                    className="h-[160px] w-[180px] rounded-full object-cover object-center"
                    src="https://kenh14cdn.com/203336854389633024/2025/3/23/phao-sunghiepchuongonline-video-cuttercom5-ezgifcom-video-to-gif-converter-1742743391566-17427433926181286024766.gif"
                    alt=""
                />
            </div>
            <div className="mt-2 w-full">
                <h3 className="text-base font-medium truncate">Người yêu cũ anh peter</h3>
                <span className="text-sm text-gray-400">Pháo</span>
            </div>
        </div>
    );
};

const MainContent = () => {
    const [trendingSongs, setTrendingSongs] = useState([]);
    
    useEffect(() => {
        const fetchTrendingSongs = async () => {
            try {
                const response = await getAllSongs();                
                setTrendingSongs(response.data.results);
            } catch (error) {
                console.error("Error fetching trending songs:", error);
            }
        };

        fetchTrendingSongs();
    }, []);

    return (
        <div className="bg-[#131313] text-white p-4 mr-2 rounded-lg flex-1 overflow-y-auto space-y-4">
            <div>
                <div className="flex flex-row justify-between">
                    <h2 className="text-2xl font-bold mb-6 cursor-pointer hover:underline">Trending Songs</h2>
                    <span className="text-sm font-bold text-gray-400 cursor-pointer hover:underline">Hiện tất cả</span>
                </div>
                <div className="flex flex-row gap-4 overflow-x-auto pb-4 scrollbar-none">
                    {trendingSongs.map((song, index) => (
                        <Song
                            key={index}
                            song={song}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MainContent;