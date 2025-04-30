import { useEffect } from "react";
import { useAudio } from "../../utils/audioContext";

const SongDescription = () => {

  const { setCurrentSong, currentSong, audio, setAudio, setIsPlaying, isPlaying } = useAudio();
  

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

  const handlePause = () => {
    setIsPlaying(false);
    audio.pause() // Cập nhật trạng thái isPlaying thành false khi video tạm dừng
  };
  const handlePlay = () => {
    setIsPlaying(true); // Cập nhật trạng thái isPlaying thành true khi video phát
    audio.play()
  }

  return (
    <div className="w-[400px]">
      <span>Song</span>
      {currentSong && (
        <video
          id="song-video"
          src={currentSong.url_video}
          controls
          muted // Tắt âm thanh
          className="w-full h-auto rounded-lg hide-volume"
          onPause={handlePause} // Gọi handlePause khi video tạm dừng
          onPlay={handlePlay}
        />
      )}
    </div>
  );
};

export default SongDescription;
