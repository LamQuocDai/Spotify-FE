import { useState } from "react";
import Header from "./user/Header.jsx";
import Libraries from "./user/library/Libraries.jsx";
import MainContent from "./user/MainContent.jsx";
import PlayerControls from "./user/PlayerControls.jsx";
import MyLibrary from "./user/library/MyLibrary.jsx";
import ChatManager from "./chat/ChatManager.jsx";
import SongDescription from "./user/SongDescription.jsx";
import { useAudio } from "../utils/audioContext.jsx";

const HomePage = () => {
  const [currentView, setCurrentView] = useState("main");

  const {currentSong} = useAudio();

  return (
    <div className="flex flex-1 flex-col h-screen bg-black">
      <Header />
      <div className="flex flex-row flex-1 overflow-hidden">
        <Libraries setCurrentView={setCurrentView} currentView={currentView}/>
        {currentView === "main" ? (
          <MainContent/>
        ) : (
          <MyLibrary playlist={currentView} setCurrentView={setCurrentView}/>
        )}
        {currentSong && (<SongDescription/>)}
      </div>
      {currentSong && (<PlayerControls/>)}
      <ChatManager />
    </div>
  );
};

export default HomePage;
