import { useEffect } from "react";

const SongDescription = ({ song, isPlaying, setIsPlaying }) => {
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
    setIsPlaying(false); // Cập nhật trạng thái isPlaying thành false khi video tạm dừng
  };
  const handlePlay = () => {
    setIsPlaying(true); // Cập nhật trạng thái isPlaying thành true khi video phát
  }

  return (
    <div className="w-[400px]">
      <span>Song</span>
      {song && (
        <video
          id="song-video"
          src={song.url_video}
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
