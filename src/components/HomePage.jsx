import { useState } from "react";
import Header from "./user/Header.jsx";
import Libraries from "./user/library/Libraries.jsx";
import MainContent from "./user/MainContent.jsx";
import PlayerControls from "./user/PlayerControls.jsx";
import MyLibrary from "./user/library/MyLibrary.jsx";
import ChatManager from "./chat/ChatManager.jsx";

const HomePage = () => {
  const [currentView, setCurrentView] = useState("main");
  return (
    <div className="flex flex-1 flex-col h-screen bg-black">
      <Header />
      <div className="flex flex-1 flex-row">
        <Libraries setCurrentView={setCurrentView} />
        {currentView === "main" ? (
          <MainContent />
        ) : (
          <MyLibrary playlist={currentView} />
        )}
      </div>
      <PlayerControls />
      <ChatManager />
    </div>
  );
};

export default HomePage;
