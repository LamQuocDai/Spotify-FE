# 🎵 Spotify Front-End

A modern React-based web application that replicates the functionality and design of the Spotify music streaming service.

## 📖 Overview

This project is a feature-rich Spotify clone built with React and Vite. It includes both user-facing and admin interfaces to manage music content, playlists, and users. The front-end communicates with a backend API to handle data storage and retrieval.

## ✨ Features

### 🎧 User Features
- **Music Playback**: Stream music with a fully functional audio player
- **Music Library**: Browse and search songs, artists, and genres
- **Playlist Management**: Create, view, and manage personal playlists
- **User Authentication**: Sign up, login, and OAuth integration
- **Liked Songs**: Special playlist for favorite tracks
- **Context Menus**: Right-click functionality for additional options

### 👩‍💼 Admin Features
- **Dashboard**: Administrative overview of the platform
- **User Management**: Create, update, and delete user accounts
- **Song Management**: Upload, edit, and delete songs
- **Playlist Management**: Create and manage playlists
- **Genre Management**: Add and organize music genres

## 🛠️ Technologies

- **React 19**: Modern UI library
- **Vite**: Next generation frontend tooling
- **React Router**: Client-side routing
- **Mantine UI**: Component library with modals, notifications, and UI elements
- **TailwindCSS**: Utility-first CSS framework
- **Axios**: HTTP client for API calls
- **HLS.js**: HTTP Live Streaming client
- **JWT**: Authentication via JSON web tokens

## 🏗️ Project Structure

```
spotify-fe/
├── public/
├── src/
│   ├── components/
│   │   ├── admin/           # Admin interface components
│   │   │   ├── Playlists/
│   │   │   ├── Songs/
│   │   │   ├── Users/
│   │   │   └── Genres/
│   │   ├── auth/            # Authentication components
│   │   └── user/            # User interface components
│   │       ├── library/
│   │       └── ...
│   ├── context/
│   │   └── auth/            # Authentication context
│   ├── services/            # API service calls
│   ├── utils/               # Utility functions and contexts
│   ├── App.jsx             # Main application component
│   └── main.jsx            # Entry point
└── package.json
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/LamQuocDai/Spotify-FE.git
cd Spotify-FE
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Start the development server
```bash
npm run dev
# or
yarn dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint for code quality
- `npm run preview` - Preview production build locally

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgements

- [Spotify](https://www.spotify.com) for design inspiration
- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Mantine UI](https://mantine.dev/)
- [TailwindCSS](https://tailwindcss.com/)
