import { useEffect, useRef } from "react";
import { useAudio } from "../../utils/audioContext";
import Hls from "hls.js"; // Thêm hls.js để hỗ trợ HLS (nếu dùng)
import { IconDownload } from '@tabler/icons-react';

const SongDescription = () => {
    const { setCurrentSong, currentSong, audio, setAudio, setIsPlaying, isPlaying, duration, currentTime, setCurrentTime } = useAudio();
    const videoRef = useRef(null);
    const hlsRef = useRef(null); // Ref cho hls.js instance

    const progressPercent = duration > 0 && currentTime >= 0 ? (currentTime / duration) * 100 : 0;

    // Xử lý phát/tạm dừng video và trạng thái tab
    useEffect(() => {
        const videoElement = videoRef.current;
        if (!videoElement || !currentSong) return;

        const handleVisibilityChange = () => {
            if (document.hidden) {
                if (isPlaying) {
                    videoElement.pause(); // Tạm dừng khi tab ẩn
                }
            } else {
                if (isPlaying) {
                    videoElement.play().catch((error) => console.error("Play error after tab change:", error));
                }
            }
        };

        // Lắng nghe sự kiện thay đổi tab
        document.addEventListener("visibilitychange", handleVisibilityChange);

        // Nếu dùng HLS (file .m3u8)
        if (currentSong.url_video.endsWith(".m3u8") && Hls.isSupported()) {
            if (hlsRef.current) {
                hlsRef.current.destroy(); // Hủy instance cũ
            }
            const hls = new Hls();
            hls.loadSource(currentSong.url_video);
            hls.attachMedia(videoElement);
            hlsRef.current = hls;

            hls.on(Hls.Events.MANIFEST_PARSED, () => {
                if (isPlaying && !document.hidden) {
                    videoElement.play().catch((error) => console.error("HLS play error:", error));
                }
            });
        } else {
            // Nếu dùng MP4 trực tiếp
            videoElement.src = currentSong.url_video;
            if (isPlaying && !document.hidden) {
                videoElement.play().catch((error) => console.error("Video play error:", error));
            }
        }

        return () => {
            if (hlsRef.current) {
                hlsRef.current.destroy(); // Cleanup HLS instance
                hlsRef.current = null;
            }
            document.removeEventListener("visibilitychange", handleVisibilityChange);
        };
    }, [currentSong, isPlaying]);

    // Chỉ đồng bộ currentTime khi tua (giảm giật)
    useEffect(() => {
        const videoElement = videoRef.current;
        if (videoElement && Math.abs(videoElement.currentTime - currentTime) > 1) {
            videoElement.currentTime = currentTime; // Chỉ cập nhật nếu lệch lớn
        }
    }, [currentTime]);

    // Dừng video khi audio kết thúc
    useEffect(() => {
        const videoElement = videoRef.current;
        if (!videoElement || !audio) return;

        const handleAudioEnded = () => {
            videoElement.pause(); // Dừng video
            videoElement.currentTime = 0; // Đưa video về đầu (tùy chọn)
            setIsPlaying(false); // Cập nhật trạng thái phát
        };

        // Lắng nghe sự kiện onEnded từ audio
        audio.addEventListener("ended", handleAudioEnded);

        return () => {
            audio.removeEventListener("ended", handleAudioEnded);
        };
    }, [audio, setIsPlaying]);
    console.log(currentSong);

    return (
        <div className="w-[400px] bg-[#131313] shadow-lg rounded-lg">
            <span className="text-xl font-semibold text-white px-2">Song</span>
            {currentSong && (
                <>
                    <video id="song-video" ref={videoRef} controls muted preload="auto" className="w-full h-auto rounded-lg mt-4 hide-native-controls" />
                    <div className="mt-4 px-2">
                        <h3 className="text-lg font-bold text-white">{currentSong.song_name || "Unknown Title"}</h3>
                        <p className="text-sm text-gray-600">{currentSong.singer_name || "Unknown Artist"}</p>
                    </div>
                    <div className="mt-4 flex gap-4 px-2">
                        <a
                            download={`${currentSong.song_name || "video"}.mp4`}
                            className="px-4 py-2 text-white rounded-lg shadow transition duration-200 cursor-pointer flex flex-row"
                        >
                            <IconDownload stroke={2} /> Video
                        </a>
                        <a
                            download={`${currentSong.song_name || "audio"}.mp3`}
                            className="px-4 py-2 text-white rounded-lg shadow  transition duration-200 cursor-pointer flex flex-row"
                        >
                            <IconDownload stroke={2} /> Audio
                        </a>
                    </div>
                </>
            )}
        </div>
    );
};

export default SongDescription;
