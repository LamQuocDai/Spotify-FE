import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import Login from "./components/user/Login";
import Admin from "./components/admin/Admin";
import User from "./components/admin/User/User";
import CreateUserForm from "./components/admin/User/Create/CreateUserForm";
import UpdateUserForm from "./components/admin/User/Update/UpdateUserForm";
import Song from "./components/admin/Song/Song";
import CreateSongForm from "./components/admin/Song/Create/CreateSongForm";
import UpdateSongForm from "./components/admin/Song/Update/UpadteSongForm";
import Genre from "./components/admin/Genre/Genre";
import CreateGenreForm from "./components/admin/Genre/Create/CreateGenreForm";
import UpdateGenreForm from "./components/admin/Genre/Update/UpdateGenreForm";
import Playlist from "./components/admin/Playlists/Playlists";
import CreatePlaylistForm from "./components/admin/Playlists/Create/CreatePlaylistForm";
import UpdatePlaylistForm from "./components/admin/Playlists/Update/UpdatePlaylistForm";
import { AudioProvider } from "./utils/audioContext";
import SignUp from "./components/user/SignUp";
import OAuthCallback from "./components/auth/OAuthCallback";

function App() {
  return (
    <BrowserRouter>
      <AudioProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/auth/callback" element={<OAuthCallback />} />

          <Route path="/" element={<HomePage />} />

          <Route path="admin" element={<Admin />}>
            <Route path="users" element={<User />} />
            <Route path="users/create" element={<CreateUserForm />} />
            <Route path="users/update" element={<UpdateUserForm />} />

            <Route path="songs" element={<Song />} />
            <Route path="songs/create" element={<CreateSongForm />} />
            <Route path="songs/update" element={<UpdateSongForm />} />

            <Route path="genres" element={<Genre />} />
            <Route path="genres/create" element={<CreateGenreForm />} />
            <Route path="genres/update" element={<UpdateGenreForm />} />

            <Route path="playlists" element={<Playlist />} />
            <Route path="playlists/create" element={<CreatePlaylistForm />} />
            <Route path="playlists/update" element={<UpdatePlaylistForm />} />
          </Route>
        </Routes>
      </AudioProvider>
    </BrowserRouter>
  );
}

export default App;
