import { useState } from "react";

const PlayerControls = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(50);
    // chỗ này lấy api thay cho này, có thể dùng truyền tham số từ chỗ HomePage
    const currentSong = {
        title: "Chìm vào tình yêu",
        artist: "PAR SG",
        image: "https://kenh14cdn.com/203336854389633024/2025/3/23/phao-sunghiepchuongonline-video-cuttercom5-ezgifcom-video-to-gif-converter-1742743391566-17427433926181286024766.gif",
        duration: "3:45",
    }

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-black h-[12vh] border-t border-gray-800 px-4">
            <div className="flex items-center justify-between h-full max-w-screen-2xl mx-auto">
                {/* Currently Playing */}
                <div className="flex items-center w-1/4">
                    <img
                        src={currentSong.image}
                        alt="Song cover"
                        className="h-14 w-14 rounded-md mr-4"
                    />
                    <div>
                        <h4 className="text-white text-sm">Chìm vào tình yêu</h4>
                        <p className="text-xs text-gray-400">PAR SG</p>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="ml-2 text-white cursor-pointer size-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                </div>

                {/* Playback Controls */}
                <div className="flex flex-col items-center w-1/2">
                    <div className="flex items-center gap-4 mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="cursor-pointer text-white size-6">
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M21 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061A1.125 1.125 0 0 1 21 8.689v8.122ZM11.25 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061a1.125 1.125 0 0 1 1.683.977v8.122Z"
                            />
                        </svg>
                        <button className=" rounded-full p-2" onClick={() => setIsPlaying(!isPlaying)}>
                            {isPlaying ? (
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="text-black w-6 h-6">
                                    <path
                                        fillRule="evenodd"
                                        d="M6.75 5.25a.75.75 0 0 1 .75-.75H9a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H7.5a.75.75 0 0 1-.75-.75V5.25Zm7.5 0A.75.75 0 0 1 15 4.5h1.5a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H15a.75.75 0 0 1-.75-.75V5.25Z"
                                    />
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="text-black w-6 h-6">
                                    <path
                                        fillRule="evenodd"
                                        d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z"
                                    />
                                </svg>
                            )}
                        </button>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="text-white size-6">
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M3 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061A1.125 1.125 0 0 1 3 16.811V8.69ZM12.75 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061a1.125 1.125 0 0 1-1.683-.977V8.69Z"
                            />
                        </svg>
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
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-gray-400">
                        <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 0 0 1.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06ZM18.584 5.106a.75.75 0 0 1 1.06 0c3.808 3.807 3.808 9.98 0 13.788a.75.75 0 0 1-1.06-1.06 8.25 8.25 0 0 0 0-11.668.75.75 0 0 1 0-1.06Z" />
                        <path d="M15.932 7.757a.75.75 0 0 1 1.061 0 6 6 0 0 1 0 8.486.75.75 0 0 1-1.06-1.061 4.5 4.5 0 0 0 0-6.364.75.75 0 0 1 0-1.06Z" />
                    </svg>
                    <div className="w-24 h-1 bg-gray-600 rounded-full">
                        <div className="h-1 bg-white rounded-full" style={{ width: `${volume}%` }}></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlayerControls;
