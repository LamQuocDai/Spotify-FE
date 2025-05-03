import { useEffect } from "react";
import { useAudio } from "../../utils/audioContext";

const SongDescription = () => {

  const { setCurrentSong, currentSong, audio, setAudio, setIsPlaying, isPlaying, duration,currentTime } = useAudio();
  
  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  useEffect(() => {
    const videoElement = document.getElementById("song-video");
    if (videoElement) {
      if (isPlaying) {
        videoElement.play(); // Phát video nếu isPlaying là true
      } else {
        videoElement.pause(); // Tạm dừng video nếu isPlaying là false
      }
    }
  }, [isPlaying]); // Theo dõi sự thay đổi của isPlaying

  useEffect(() => {
    const videoElement = document.getElementById("song-video");
    if (videoElement) {
      videoElement.currentTime = currentTime; // Cập nhật thời gian phát video
    }
  }, [currentTime]);
  
  return (
    <div className="w-[400px]">
      <span>Song</span>
      {currentSong && (
        <video
          id="song-video"
          src={currentSong.url_video}
          controls
          muted // Tắt âm thanh
          className="w-full h-auto rounded-lg hide-volume hide-native-controls"
        />
      )}
    </div>
  );
};

export default SongDescription;
