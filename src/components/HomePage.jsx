import { useState } from "react";
import Header from "./user/Header.jsx";
import Libraries from "./user/library/Libraries.jsx";
import MainContent from "./user/MainContent.jsx";
import PlayerControls from "./user/PlayerControls.jsx";
import MyLibrary from "./user/library/MyLibrary.jsx";
import ChatManager from "./chat/ChatManager.jsx";
import SongDescription from "./user/SongDescription.jsx";

const HomePage = () => {
  const [currentView, setCurrentView] = useState("main");
  const [currentSong, setCurrentSong] = useState(null); 
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="flex flex-1 flex-col h-screen bg-black">
      <Header />
      <div className="flex flex-row">
        <Libraries setCurrentView={setCurrentView} />
        {currentView === "main" ? (
          <MainContent setCurrentSong={setCurrentSong}/>
        ) : (
          <MyLibrary playlist={currentView} />
        )}
        {currentSong && (<SongDescription song={currentSong} isPlaying={isPlaying} setIsPlaying={setIsPlaying} />)}
      </div>
      {currentSong && (<PlayerControls currentSong={currentSong} setIsPlaying={setIsPlaying} isPlaying={isPlaying}/>)}
      <ChatManager />
    </div>
  );
};

export default HomePage;
