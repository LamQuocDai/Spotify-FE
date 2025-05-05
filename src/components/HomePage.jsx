import { useState } from "react";
import Header from "./user/Header.jsx";
import Libraries from "./user/library/Libraries.jsx";
import MainContent from "./user/MainContent.jsx";
import PlayerControls from "./user/PlayerControls.jsx";
import MyLibrary from "./user/library/MyLibrary.jsx";
import ChatManager from "./chat/ChatManager.jsx";
import SongDescription from "./user/SongDescription.jsx";
import { useAudio } from "../utils/audioContext.jsx";
import ListSongs from "./user/ListSongs.jsx";

const HomePage = () => {
    const [currentView, setCurrentView] = useState("main");
    const [listSongsDetail, setListSongsDetail] = useState([]);
    const { currentSong } = useAudio();

    return (
        <div className="flex flex-1 flex-col h-screen bg-black">
            <Header setCurrentView={setCurrentView}/>
            <div className="flex flex-row flex-1 overflow-hidden">
                <Libraries setCurrentView={setCurrentView} currentView={currentView} />
                {currentView === "main" ? <MainContent setCurrentView={setCurrentView} setListSongsDetail={setListSongsDetail} /> : currentView === "listSongs" ? <ListSongs listSongs={listSongsDetail}/> : <MyLibrary playlist={currentView} setCurrentView={setCurrentView} />}
                {currentSong && <SongDescription />}
            </div>
            {currentSong && <PlayerControls />}
            <ChatManager />
        </div>
    );
};

export default HomePage;
