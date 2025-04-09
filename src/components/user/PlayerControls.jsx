import { useState } from "react";
import { IconCirclePlus, IconPlayerSkipBackFilled, IconPlayerSkipForwardFilled, IconPlayerPlayFilled, IconPlayerPauseFilled, IconVolume, IconVolume3 } from "@tabler/icons-react";

const PlayerControls = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMute, setIsMute] = useState(false);
    const [volume, setVolume] = useState(50);
    // chỗ này lấy api thay cho này, có thể dùng truyền tham số từ chỗ HomePage
    const currentSong = {
        title: "Chìm vào tình yêu",
        artist: "PAR SG",
        image: "https://kenh14cdn.com/203336854389633024/2025/3/23/phao-sunghiepchuongonline-video-cuttercom5-ezgifcom-video-to-gif-converter-1742743391566-17427433926181286024766.gif",
        duration: "3:45",
    };

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-black h-[12vh] border-t border-gray-800 px-4">
            <div className="flex items-center justify-between h-full max-w-screen-2xl mx-auto">
                {/* Currently Playing */}
                <div className="flex items-center w-1/4">
                    <img src={currentSong.image} alt="Song cover" className="h-14 w-14 rounded-md mr-4" />
                    <div>
                        <h4 className="text-white text-sm">Chìm vào tình yêu</h4>
                        <p className="text-xs text-gray-400">PAR SG</p>
                    </div>
                    <IconCirclePlus stroke={2} className="ml-2 text-white cursor-pointer size-5" />
                </div>

                {/* Playback Controls */}
                <div className="flex flex-col items-center w-1/2">
                    <div className="flex items-center gap-4 mb-2">
                        <IconPlayerSkipBackFilled stroke={2} className="cursor-pointer text-white size-6" />
                        <button className=" rounded-full p-2" onClick={() => setIsPlaying(!isPlaying)}>
                            {isPlaying ? <IconPlayerPauseFilled className="text-white w-6 h-6" /> : <IconPlayerPlayFilled className="text-white w-6 h-6" />}
                        </button>
                        <IconPlayerSkipForwardFilled className="text-white size-6" />
                    </div>
                    <div className="w-full flex items-center gap-2">
                        <span className="text-xs text-gray-400">1:42</span>
                        <div className="h-1 flex-1 bg-gray-600 rounded-full">
                            <div className="h-1 w-1/3 bg-white rounded-full"></div>
                        </div>
                        <span className="text-xs text-gray-400">2:57</span>
                    </div>
                </div>

                {/* Volume Control */}
                <div className="flex items-center gap-2 w-1/4 justify-end">
                    <div onClick={() => setIsMute(!isMute)}>{isMute ? <IconVolume3 stroke={2} className="w-5 h-5 text-gray-400 cursor-pointer" /> : <IconVolume stroke={2} className="w-5 h-5 text-gray-400 cursor-pointer" />}</div>
                    <div className="w-24 h-1 bg-gray-600 rounded-full">
                        <div className="h-1 bg-white rounded-full" style={{ width: `${volume}%` }}></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlayerControls;
